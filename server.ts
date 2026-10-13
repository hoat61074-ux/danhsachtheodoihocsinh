import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defaultData } from './src/data/defaultData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'bgl_tan_van.json');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');

// Ensure data folder and backup folder exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
}

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    // Synchronize class schedules to match latest parish schedule policy
    if (Array.isArray(data.classes)) {
      data.classes.forEach((c: any) => {
        const name = c.name;
        if (name === "Đồng Cỏ Non" || name === "Sơ Cấp I" || name === "Sơ Cấp II") {
          c.schedule = "Tối Thứ 2 & Tối Thứ 7 (19:00)";
          c.massSchedule = "Tối Thứ 2, Thứ 7 (19:00) & Lễ Thiếu Nhi Chúa Nhật (Họ Tân Vạn)";
        } else {
          c.schedule = "Tối Thứ 4, Tối Thứ 6 (19:00) & Sáng Chủ Nhật (08:00)";
          c.massSchedule = "Tối Thứ 4, Thứ 6 (19:00) & Chúa Nhật 08:00 (Họ Tân Vạn)";
        }
      });
    }
    return data;
  } catch (err) {
    console.error('Error reading data file, using defaultData:', err);
    return defaultData;
  }
}

function saveData(data: any) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    // Rolling backup copy on server (keep up to 5 snapshots)
    try {
      const backupFile = path.join(BACKUP_DIR, `bgl_backup_${Date.now()}.json`);
      fs.writeFileSync(backupFile, JSON.stringify(data, null, 2), 'utf-8');
      const files = fs.readdirSync(BACKUP_DIR).sort();
      if (files.length > 5) {
        files.slice(0, files.length - 5).forEach((f) => {
          try { fs.unlinkSync(path.join(BACKUP_DIR, f)); } catch {}
        });
      }
    } catch (bkErr) {
      console.warn('Could not write rolling server backup:', bkErr);
    }

    return true;
  } catch (err) {
    console.error('Error saving data:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const portArgIdx = process.argv.indexOf('--port');
  const portFromArg = portArgIdx !== -1 && process.argv[portArgIdx + 1] ? parseInt(process.argv[portArgIdx + 1], 10) : null;
  const PORT = portFromArg || (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);

  app.use(express.json({ limit: '10mb' }));
  app.use(express.static(path.join(__dirname, 'public')));

  // Ensure manifest.webmanifest and manifest.json return correct MIME type for PWA WebAPK
  app.get(['/manifest.webmanifest', '/manifest.json'], (_req, res) => {
    const p = path.join(__dirname, 'public', 'manifest.json');
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
      res.sendFile(p);
    } else {
      res.status(404).send('Manifest not found');
    }
  });

  // Explicit route for PWA Service Worker (Ensure javascript MIME type so browser never sees text/html)
  app.get('/sw.js', (_req, res) => {
    const swDist = path.join(__dirname, 'dist', 'sw.js');
    const swPublic = path.join(__dirname, 'public', 'sw.js');
    const target = fs.existsSync(swDist) ? swDist : (fs.existsSync(swPublic) ? swPublic : null);
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Service-Worker-Allowed', '/');
    if (target) {
      return res.sendFile(target);
    }
    res.send(`self.addEventListener('fetch', () => {});`);
  });

  app.get('/workbox-*.js', (req, res, next) => {
    const fileName = path.basename(req.path);
    const wbDist = path.join(__dirname, 'dist', fileName);
    const wbPublic = path.join(__dirname, 'public', fileName);
    const target = fs.existsSync(wbDist) ? wbDist : (fs.existsSync(wbPublic) ? wbPublic : null);
    if (target) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      return res.sendFile(target);
    }
    next();
  });

  // Download standalone offline HTML app
  app.get('/api/download/offline-html', (_req, res) => {
    const p = path.join(__dirname, 'public', 'Ung_Dung_BGL_Tan_Van.html');
    if (!fs.existsSync(p)) {
      try {
        const { execSync } = require('child_process');
        execSync('node scripts/generate_offline_html.js', { stdio: 'ignore' });
      } catch (genErr) {
        console.error('Failed generating offline html:', genErr);
      }
    }

    if (fs.existsSync(p)) {
      res.setHeader('Content-Disposition', 'attachment; filename="Ung_Dung_BGL_Tan_Van.html"');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(p);
    } else {
      res.status(404).send('Chưa tạo file');
    }
  });

  // Download Windows Desktop Shortcut (.url)
  app.get('/api/download/windows-shortcut', (req, res) => {
    const origin = `${req.protocol}://${req.get('host')}`;
    const shortcutContent = `[InternetShortcut]\r\nURL=${origin}\r\nIconIndex=0\r\nIconFile=${origin}/favicon.ico\r\n`;
    res.setHeader('Content-Disposition', 'attachment; filename="Ung_Dung_BGL_Tan_Van.url"');
    res.setHeader('Content-Type', 'application/internet-shortcut');
    res.send(shortcutContent);
  });

  // Download Windows Batch Installer that downloads the local icon and creates a permanent .lnk on Desktop
  app.get('/api/download/windows-setup-bat', (req, res) => {
    const origin = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    const batContent = `@echo off
chcp 65001 >nul
title Cai Dat BGL Giao Ho Tan Van
echo ========================================================
echo   DANG CAI DAT UNG DUNG BGL GIAO HO TAN VAN RA DESKTOP
echo ========================================================
set "APP_URL=${origin}"
set "APP_NAME=BGL Giao Ho Tan Van"
set "ICON_DIR=%LOCALAPPDATA%\\BGL_Tan_Van"

if not exist "%ICON_DIR%" mkdir "%ICON_DIR%"
echo 1. Dang tai bieu tuong logo sac net ve may tinh...
powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('%APP_URL%/favicon.ico', '%ICON_DIR%\\app.ico')"

echo 2. Dang tao loi tat man hinh Desktop giu nguyen logo...
powershell -NoProfile -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut([Environment]::GetFolderPath('Desktop') + '\\%APP_NAME%.lnk'); $s.TargetPath = '%APP_URL%'; $s.IconLocation = '%ICON_DIR%\\app.ico, 0'; $s.Description = 'Ung dung Ban Giao Ly Giao Ho Tan Van'; $s.Save()"

echo.
echo ========================================================
echo   DA CAI DAT THANH CONG!
echo   Bieu tuong Logo BGL Tan Van da xuat hien tren man hinh Desktop!
echo ========================================================
pause
`;
    res.setHeader('Content-Disposition', 'attachment; filename="Cai_Dat_BGL_Tan_Van.bat"');
    res.setHeader('Content-Type', 'application/x-bat; charset=utf-8');
    res.send(batContent);
  });

  // Download deployable web zip for Netlify / Vercel
  app.get('/api/download/web-zip', (_req, res) => {
    const p = path.join(__dirname, 'public', 'bgl-tan-van-web.zip');
    if (fs.existsSync(p)) {
      res.setHeader('Content-Disposition', 'attachment; filename="BGL_Tan_Van_Web_Deploy_Package.zip"');
      res.setHeader('Content-Type', 'application/zip');
      res.sendFile(p);
    } else {
      res.status(404).send('Chưa tạo file zip');
    }
  });

  // API Routes
  app.get('/api/data', (_req, res) => {
    const data = loadData();
    res.json(data);
  });

  // Download raw database backup JSON from server
  app.get('/api/backup/download', (_req, res) => {
    if (fs.existsSync(DATA_FILE)) {
      const now = new Date().toISOString().slice(0, 10);
      res.setHeader('Content-Disposition', `attachment; filename="BGL_Tan_Van_Backup_Server_${now}.json"`);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.sendFile(DATA_FILE);
    } else {
      res.status(404).send('Không có file dữ liệu');
    }
  });

  // Endpoints for 2025-2026 Grade Sheet
  app.get('/api/bang-diem-2025-2026', (_req, res) => {
    const p = path.join(DATA_DIR, 'bang_diem_2025_2026.json');
    if (fs.existsSync(p)) {
      res.setHeader('Content-Type', 'application/json');
      res.sendFile(p);
    } else {
      res.status(404).json({ error: 'Chưa có file bảng điểm 2025 - 2026' });
    }
  });

  app.get('/api/download/bang-diem-2025-2026.csv', (_req, res) => {
    const p = path.join(DATA_DIR, 'bang_diem_2025_2026.csv');
    if (fs.existsSync(p)) {
      res.setHeader('Content-Disposition', 'attachment; filename="Bang_Diem_2025_2026_Giao_Ho_Tan_Van.csv"');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.sendFile(p);
    } else {
      res.status(404).send('Không tìm thấy file');
    }
  });

  app.post('/api/data', (req, res) => {
    const newData = req.body;
    if (!newData || !Array.isArray(newData.students)) {
      return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
    }
    const success = saveData(newData);
    if (success) {
      res.json({ success: true, lastUpdated: newData.lastUpdated });
    } else {
      res.status(500).json({ error: 'Không thể lưu dữ liệu' });
    }
  });

  // Batch attendance update
  app.post('/api/attendance/batch', (req, res) => {
    const { date, records, reasons } = req.body; // records: { [studentId]: 'present' | 'excused' | 'unexcused' | 'late' | null }
    if (!date || !records) {
      return res.status(400).json({ error: 'Thiếu ngày hoặc thông tin điểm danh' });
    }
    const currentData = loadData();
    currentData.students = currentData.students.map((st: any) => {
      if (records[st.id] !== undefined) {
        const updatedAttendance = { ...(st.attendance || {}) };
        const updatedReasons = { ...(st.attendanceReasons || {}) };
        const status = records[st.id];

        if (!status) {
          delete updatedAttendance[date];
          delete updatedReasons[date];
        } else {
          updatedAttendance[date] = status;
          if (reasons && reasons[st.id] !== undefined) {
            if (typeof reasons[st.id] === 'string' && reasons[st.id].trim()) {
              updatedReasons[date] = reasons[st.id].trim();
            } else {
              delete updatedReasons[date];
            }
          }
        }

        return {
          ...st,
          attendance: updatedAttendance,
          attendanceReasons: updatedReasons,
        };
      }
      return st;
    });

    saveData(currentData);
    res.json({ success: true, count: Object.keys(records).length });
  });

  // Parents submit leave request
  app.post('/api/leave-requests', (req, res) => {
    const { studentId, studentName, className, date, reason, parentName, parentPhone } = req.body;
    if (!studentName || !date || !reason || !parentPhone) {
      return res.status(400).json({ error: 'Vui lòng điền đủ thông tin đơn xin phép' });
    }

    const currentData = loadData();
    if (!currentData.leaveRequests) {
      currentData.leaveRequests = [];
    }

    const newRequest = {
      id: 'lr-' + Date.now(),
      studentId: studentId || '',
      studentName,
      className: className || '',
      date,
      reason,
      parentName: parentName || 'Phụ huynh',
      parentPhone,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    currentData.leaveRequests.unshift(newRequest);
    saveData(currentData);
    res.json({ success: true, request: newRequest });
  });

  // Approve / reject leave request
  app.patch('/api/leave-requests/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const currentData = loadData();
    if (!currentData.leaveRequests) currentData.leaveRequests = [];

    const item = currentData.leaveRequests.find((r: any) => r.id === id);
    if (!item) {
      return res.status(404).json({ error: 'Không tìm thấy đơn xin phép' });
    }
    item.status = status;

    // If approved and student exists, mark attendance as 'excused' for that date
    if (status === 'approved' && item.studentId) {
      currentData.students = currentData.students.map((st: any) => {
        if (st.id === item.studentId || (st.fullName.toLowerCase() === item.studentName.toLowerCase() && st.className === item.className)) {
          return {
            ...st,
            attendance: {
              ...st.attendance,
              [item.date]: 'excused',
            },
          };
        }
        return st;
      });
    }

    saveData(currentData);
    res.json({ success: true, request: item });
  });

  // Diary endpoints (Only author can write)
  app.post('/api/diary', (req, res) => {
    const { date, className, lessonTopic, attendanceSummary, content, reminders, author, pin } = req.body;
    const currentData = loadData();
    const correctPin = currentData.adminPin || '1234';

    if (pin !== correctPin) {
      return res.status(403).json({ error: 'Mã PIN không đúng! Chỉ người phụ trách mới có quyền viết nhật ký.' });
    }

    if (!currentData.diaryEntries) currentData.diaryEntries = [];
    const newEntry = {
      id: 'de-' + Date.now(),
      date: date || new Date().toISOString().slice(0, 10),
      className: className || 'Toàn thể',
      lessonTopic: lessonTopic || '',
      attendanceSummary: attendanceSummary || '',
      content: content || '',
      reminders: reminders || '',
      author: author || 'Giáo lý viên',
      createdAt: new Date().toISOString(),
    };

    currentData.diaryEntries.unshift(newEntry);
    saveData(currentData);
    res.json({ success: true, entry: newEntry });
  });

  // Delete diary entry
  app.delete('/api/diary/:id', (req, res) => {
    const { id } = req.params;
    const { pin } = req.body;
    const currentData = loadData();
    const correctPin = currentData.adminPin || '1234';

    if (pin !== correctPin) {
      return res.status(403).json({ error: 'Mã PIN không đúng!' });
    }

    if (!currentData.diaryEntries) currentData.diaryEntries = [];
    currentData.diaryEntries = currentData.diaryEntries.filter((e: any) => e.id !== id);
    saveData(currentData);
    res.json({ success: true });
  });

  // Reset to default sample data
  app.post('/api/reset-default', (_req, res) => {
    saveData(defaultData);
    res.json({ success: true, data: defaultData });
  });

  // Healthcheck endpoint for Cloud Run and monitoring
  app.get(['/healthz', '/api/health'], (_req, res) => {
    res.status(200).json({ status: 'ok', time: new Date().toISOString() });
  });

  // Setup Vite dev server or serve static build
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Explicit SPA fallback for dev mode so deep links and query param URLs load reliably
    app.get('*', async (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled server error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ', details: err?.message });
    }
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Họ Tân Vạn running on http://0.0.0.0:${PORT}`);
  });

  // Cloud Run Keep-Alive configuration:
  // Must be > 60 seconds to prevent Cloud Run proxy 502 Bad Gateway / intermittent connection drops
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}

process.on('uncaughtException', (err) => {
  console.error('Server Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Server Unhandled Rejection:', reason);
});

startServer();
