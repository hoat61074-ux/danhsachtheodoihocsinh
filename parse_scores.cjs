const fs = require('fs');

const classesData = [
  {
    className: "Toát Yếu",
    students: [
      { stt: 1, name: "Giuse Nguyễn Minh Nghĩa", dob: "11/11/2008", gender: "Nam", parents: "Antôn Tuấn – Maria Lưu", k1: 47, k2: 36, tb: 41.5 },
      { stt: 2, name: "Giuse Phạm Văn Mạnh", dob: "21/05/2008", gender: "Nam", parents: "Giuse Tùng – Maria Dương", k1: 45.75, k2: 50, tb: 47.88 },
      { stt: 3, name: "Giuse Nguyễn Hữu Đức", dob: "28/11/2008", gender: "Nam", parents: "Giuse Giang – Maria Sơn", k1: 37.25, k2: 32, tb: 34.63 },
      { stt: 4, name: "Giuse Nguyễn Văn Hưng", dob: "25/11/2008", gender: "Nam", parents: "Giuse Đợi – Anna Liên", k1: 29, k2: 20, tb: 24.5 },
      { stt: 5, name: "Giuse Nguyễn Đức Hải", dob: "06/07/2008", gender: "Nam", parents: "Giuse Sung – Maria Giáo", k1: 24.25, k2: 37, tb: 30.63 },
      { stt: 6, name: "Phêrô Võ Gia Huy", dob: "07/06/2008", gender: "Nam", parents: "Phanxicô Thái – Maria Huyền", k1: 28, k2: 36, tb: 32 },
      { stt: 7, name: "Luca Phạm Khánh Duy", dob: "06/01/2008", gender: "Nam", parents: "Giuse Phượng – Maria Thu", k1: 27, k2: 31, tb: 29 },
      { stt: 8, name: "Giuse Nguyễn Quang Thắng", dob: "", gender: "Nam", parents: "Giuse Tuấn – Maria Tâm", k1: null, k2: 27, tb: 27 },
      { stt: 9, name: "Gioan Trần Minh Quân", dob: "27/10/2008", gender: "Nam", parents: "Giuse Sáng – Maria Hoài", k1: 29.5, k2: 24, tb: 26.75 },
      { stt: 10, name: "Maria Nguyễn Thu Uyên", dob: "22/12/2008", gender: "Nữ", parents: "Giuse Hướng – Maria Hiển", k1: 32, k2: 32, tb: 32 },
      { stt: 11, name: "Maria Nguyễn Ngọc Tuyền", dob: "30/01/2008", gender: "Nữ", parents: "Giuse Toản – Maria Trinh", k1: 48.25, k2: 37, tb: 42.63 },
      { stt: 12, name: "Maria Trần Thị Vân Anh", dob: "13/03/2008", gender: "Nữ", parents: "Giuse Chung – Maria Phúc", k1: 32.5, k2: 31, tb: 31.75 },
      { stt: 13, name: "Maria Trần Thị Triệu Vy", dob: "16/10/2008", gender: "Nữ", parents: "Phêrô Hậu – Maria Phục", k1: 34.75, k2: 31, tb: 32.88 },
      { stt: 14, name: "Maria Lê Thanh Hiền", dob: "05/06/2008", gender: "Nữ", parents: "Giuse Thuyên – Anna Nhiệm", k1: 43.75, k2: 35, tb: 39.38 },
      { stt: 15, name: "Maria Lê Thị Tuyết", dob: "01/12/2008", gender: "Nữ", parents: "Giuse Bảy – Luxia Xoan", k1: 27, k2: 26, tb: 26.5 },
      { stt: 16, name: "Maria Vũ Thị Quỳnh Như", dob: "29/03/2008", gender: "Nữ", parents: "Giuse Khoa – Maria Tâm", k1: 29, k2: 33, tb: 31 },
      { stt: 17, name: "Maria Phạm Thị Ngọc Anh", dob: "05/01/2008", gender: "Nữ", parents: "Antôn Chinh – Anna Oanh", k1: 43.5, k2: 38, tb: 40.75 },
      { stt: 18, name: "Maria Vũ Thị Diệu", dob: "06/10/2008", gender: "Nữ", parents: "Phêrô Linh – Chiến", k1: 39.25, k2: 36, tb: 37.63 },
      { stt: 19, name: "Anna Hà Tú Anh", dob: "19/11/2008", gender: "Nữ", parents: "Phêrô Ánh – Têrêxa Nhan", k1: 39, k2: 44, tb: 41.5 }
    ]
  },
  {
    className: "Vào Đời II",
    students: [
      { stt: 1, name: "Giuse Nguyễn Việt Tiến", dob: "15/01/2009", gender: "Nam", parents: "Giuse Tuân – Maria Hương", k1: 35.5, k2: 27.5, tb: 31.5 },
      { stt: 2, name: "Giuse Nguyễn Trung Kiên", dob: "19/09/2009", gender: "Nam", parents: "Giuse Thanh – Anna Hiểu", k1: 32, k2: 30.5, tb: 31.25 },
      { stt: 3, name: "Giuse Nguyễn Hải An", dob: "20/04/2009", gender: "Nam", parents: "Giuse Đại – Maria Tâm", k1: 31, k2: 26.5, tb: 28.75 },
      { stt: 4, name: "Giuse Lê Minh Lâm", dob: "01/04/2009", gender: "Nam", parents: "Đalênô Hoá – Anna Lan", k1: 49.75, k2: 45, tb: 47.38 },
      { stt: 5, name: "Giuse Hà Duy Linh", dob: "05/02/2009", gender: "Nam", parents: "Giuse Lộc – Cêxilia Hằng", k1: 39.5, k2: 31.5, tb: 35.5 },
      { stt: 6, name: "Phêrô Nguyễn Tiến Dũng", dob: "07/02/2009", gender: "Nam", parents: "Phê - rô Đệ - Maria Hiền", k1: 24, k2: 33.5, tb: 28.75 },
      { stt: 7, name: "Maria Vũ Huyền Trâm", dob: "21/03/2009", gender: "Nữ", parents: "Phêrô Ân – Maria Hữu", k1: 42.75, k2: 48, tb: 45.38 },
      { stt: 8, name: "Maria Phạm Ánh Trâm", dob: "18/12/2009", gender: "Nữ", parents: "Giacôbê Ngọc – Maria Tạo", k1: 24, k2: 26.5, tb: 25.25 },
      { stt: 9, name: "Maria Nguyễn Quỳnh Phương", dob: "07/10/2009", gender: "Nữ", parents: "Phêrô Thực – Anna Vui", k1: 49.5, k2: 41.5, tb: 45.5 },
      { stt: 10, name: "Anna Nguyễn Như Quỳnh", dob: "08/08/2009", gender: "Nữ", parents: "Phêrô Hùng – Anna Hương", k1: 40, k2: 48, tb: 44 },
      { stt: 11, name: "Anna Nguyễn Thị Hảo", dob: "05/04/2009", gender: "Nữ", parents: "Mẹ Maria Nguyệt", k1: 24.75, k2: 27.5, tb: 26.13 },
      { stt: 12, name: "Maria Nguyễn Mỹ Duyên", dob: "13/10/2009", gender: "Nữ", parents: "Giuse Hướng – Maria Hiển", k1: 37, k2: 34, tb: 35.5 }
    ]
  },
  {
    className: "Vào Đời I",
    students: [
      { stt: 1, name: "Antôn Nguyễn Trung Kiên", dob: "02/10/2010", gender: "Nam", parents: "Phêrô Hồng – Maria Chinh", k1: 33.25, k2: 19, tb: 26.13 },
      { stt: 2, name: "Giuse Phạm Khánh Duy", dob: "25/12/2010", gender: "Nam", parents: "Giuse Niên – Maria Hoa", k1: 22, k2: 13, tb: 17.5 },
      { stt: 3, name: "Phêrô Nguyễn Nhật Long", dob: "10/10/2010", gender: "Nam", parents: "Phêrô Tân – Mađalêna Nhung", k1: 20, k2: 18, tb: 19 },
      { stt: 4, name: "Giuse Nguyễn Đức Hải", dob: "24/01/2010", gender: "Nam", parents: "Giuse Hoá – Anna Hồng", k1: 38.75, k2: 38, tb: 38.38 },
      { stt: 5, name: "Antôn Phạm Nguyên Vũ", dob: "10/12/2010", gender: "Nam", parents: "Giuse Niệm – Maria Phương", k1: 21, k2: 15, tb: 18 },
      { stt: 6, name: "Giuse Vũ Đức Mạnh", dob: "09/08/2010", gender: "Nam", parents: "Giuse Tám – Maria Nguyệt", k1: 26.75, k2: 19, tb: 22.88 },
      { stt: 7, name: "Giuse Trần Ngọc Hải", dob: "06/08/2010", gender: "Nam", parents: "Phanxicô Cậy – Maria Thặng", k1: 23, k2: 17, tb: 20 },
      { stt: 8, name: "Antôn Nguyễn Minh Quân", dob: "02/12/2010", gender: "Nam", parents: "Antôn Tuấn – Maria Lưu", k1: 19, k2: 16, tb: 17.5 },
      { stt: 9, name: "Antôn Nguyễn Hoàng Lâm", dob: "25/11/2010", gender: "Nam", parents: "Phêrô Mến – Maria Bền", k1: 28.5, k2: 24, tb: 26.25 },
      { stt: 10, name: "Giuse Nguyễn Quang Minh", dob: "15/07/2010", gender: "Nam", parents: "Giuse Trâm – Maria Long", k1: 27.5, k2: 19, tb: 23.25 },
      { stt: 11, name: "Anna Lê Thị Quỳnh Như", dob: "23/08/2010", gender: "Nữ", parents: "Phêrô Vân – Anna Hoa", k1: 32, k2: 20, tb: 26 },
      { stt: 12, name: "Anna Nguyễn Thị Trang", dob: "08/03/2010", gender: "Nữ", parents: "Giuse Khẩn – Anna Lan", k1: 38.75, k2: 33, tb: 35.88 },
      { stt: 13, name: "Anna Nguyễn Thị Trà My", dob: "15/03/2010", gender: "Nữ", parents: "Giuse Đình – Anna Thiệp", k1: 36, k2: 30, tb: 33 },
      { stt: 14, name: "Maria Nguyễn Thị Hoài Thương", dob: "03/09/2010", gender: "Nữ", parents: "Antôn Trông – Maria Hảo", k1: 35.75, k2: 27, tb: 31.38 },
      { stt: 15, name: "Maria Phạm Khánh Huyền", dob: "23/07/2010", gender: "Nữ", parents: "Giuse Phượng – Têrêxa Thu", k1: 28.25, k2: 30, tb: 29.13 },
      { stt: 16, name: "Maria Nguyễn Phương Thảo", dob: "11/06/2010", gender: "Nữ", parents: "Giuse Minh – Anna Vân", k1: 38.25, k2: 37, tb: 37.63 },
      { stt: 17, name: "Maria Nguyễn Ngọc Tường Vy", dob: "28/10/2010", gender: "Nữ", parents: "Giuse Khắc – Maria Thuỷ", k1: 25, k2: 24, tb: 24.5 },
      { stt: 18, name: "Anna Trần Thị Hằng Nga", dob: "22/07/2010", gender: "Nữ", parents: "Phaolô Hộ - Maria Huệ", k1: 29.75, k2: 25, tb: 27.38 },
      { stt: 19, name: "Anna Nguyễn Thị Hà", dob: "05/06/2010", gender: "Nữ", parents: "Giuse Điền – Anna Thiện", k1: 29, k2: 28, tb: 28.5 },
      { stt: 20, name: "Maria Trương Hà Vy", dob: "09/05/2010", gender: "Nữ", parents: "Giuse Linh – Maria Phục", k1: 43, k2: 44, tb: 43.5 },
      { stt: 21, name: "Maria Nguyễn Han Ny", dob: "03/09/2010", gender: "Nữ", parents: "Phaolô Toán – Maria Vinh", k1: 38, k2: 38, tb: 38 }
    ]
  },
  {
    className: "Kinh Thánh III",
    students: [
      { stt: 1, name: "Giuse Hà Minh Nhật", dob: "29/07/2011", gender: "Nam", parents: "Giuse Lộc – Cêxilia Hằng", k1: 27, k2: 22, tb: 24.5 },
      { stt: 2, name: "Antôn Trần Phan Nhật Linh", dob: "20/05/2011", gender: "Nam", parents: "Antôn Ngọc – Maria Hương", k1: 22, k2: 20, tb: 21 },
      { stt: 3, name: "Giuse Nguyễn Hoàng Long", dob: "26/09/2011", gender: "Nam", parents: "Giuse Hoá – Maria Hồng", k1: 20.75, k2: 18.5, tb: 19.63 },
      { stt: 4, name: "Giuse Nguyễn Quốc Hiếu", dob: "29/08/2011", gender: "Nam", parents: "Gioan Hoa – Têrêxa Hiệu", k1: 15, k2: 11, tb: 13 },
      { stt: 5, name: "Giuse Trần Bảo Long", dob: "25/01/2011", gender: "Nam", parents: "Giuse Vĩnh – Maria Hiệu", k1: 22, k2: 25.5, tb: 23.75 },
      { stt: 6, name: "Giuse Lê Văn Hoàng", dob: "11/12/2011", gender: "Nam", parents: "Giuse Bảy – Luxia Xoan", k1: 16.5, k2: 12, tb: 14.25 },
      { stt: 7, name: "Antôn Nguyễn Minh Quân", dob: "01/05/2011", gender: "Nam", parents: "Giuse Lệ - Maria Quý", k1: 25, k2: 13, tb: 19 },
      { stt: 8, name: "Antôn Phạm Tiến Dũng", dob: "13/03/2011", gender: "Nam", parents: "Giuse Quyền – Maria Hương", k1: 12, k2: 18.5, tb: 15.25 },
      { stt: 9, name: "Gioan Phạm Hoàng Huy", dob: "29/09/2011", gender: "Nam", parents: "Giuse Ngọc – Maria Tạo", k1: 20.75, k2: 25, tb: 22.75 },
      { stt: 10, name: "Antôn Vũ Đức Long", dob: "26/12/2011", gender: "Nam", parents: "Phêrô Ân – Maria Hữu", k1: 25.75, k2: 34, tb: 29.88 },
      { stt: 11, name: "Phêrô Lê Duy Khôi", dob: "21/10/2011", gender: "Nam", parents: "Phêrô Nhi – Maria Toan", k1: 20.75, k2: 14, tb: 17.38 },
      { stt: 12, name: "Antôn Trần Duy Khánh", dob: "14/11/2011", gender: "Nam", parents: "Giuse Sáng – Maria Hoài", k1: 13.25, k2: 12, tb: 12.63 },
      { stt: 13, name: "Antôn Hà Duy Hoàn", dob: "25/11/2011", gender: "Nam", parents: "Giuse Chương – Maria Ngũ", k1: 9, k2: 12, tb: 10.5 },
      { stt: 14, name: "Phêrô Nguyễn Vũ Bảo Nam", dob: "14/08/2011", gender: "Nam", parents: "Antôn Toản – Anna Tuyết", k1: 27, k2: 20, tb: 23.5 },
      { stt: 15, name: "Têrêxa Nguyễn Quỳnh Chi", dob: "10/10/2011", gender: "Nữ", parents: "Phêrô Thực – Anna Vui", k1: 31.5, k2: 20, tb: 25.75 },
      { stt: 16, name: "Anna Nguyễn Thị Hải Yến", dob: "14/09/2011", gender: "Nữ", parents: "Antôn Nho – Anna Hằng", k1: 32, k2: 23.5, tb: 27.75 },
      { stt: 17, name: "Maria Nguyễn Thị Mỹ Duyên", dob: "28/06/2011", gender: "Nữ", parents: "Giuse Tuân – Maria Hương", k1: 28, k2: 22.5, tb: 25.25 },
      { stt: 18, name: "Maria Hoàng Thị Thùy Dương", dob: "30/04/2011", gender: "Nữ", parents: "Phêrô Phúc – Maria Tâm", k1: 32.5, k2: 15.5, tb: 24 },
      { stt: 19, name: "Têrêxa Phan Nguyễn Linh Chi", dob: "09/08/2011", gender: "Nữ", parents: "Giuse Đương – Maria Thi", k1: 43.25, k2: 42.5, tb: 42.88 },
      { stt: 20, name: "Maria Phạm Thị Khánh Huyền", dob: "10/04/2011", gender: "Nữ", parents: "Phêrô Văn – Maria Xuyến", k1: 29.75, k2: 20, tb: 24.88 },
      { stt: 21, name: "Maria Vũ Gia Như", dob: "18/08/2011", gender: "Nữ", parents: "Giuse Dinh – Maria Hương", k1: 27.5, k2: 20, tb: 23.75 },
      { stt: 22, name: "Maria Trần Ng. Quỳnh Anh", dob: "24/10/2011", gender: "Nữ", parents: "Giuse Bích – Anna Tuyết", k1: 17, k2: 18, tb: 17.5 },
      { stt: 23, name: "Anna Nguyễn Như Quyên", dob: "20/04/2011", gender: "Nữ", parents: "Phêrô Hùng – Maria Hương", k1: 24.5, k2: 37.5, tb: 31 },
      { stt: 24, name: "Maria Nguyễn Thị Ngọc Bích", dob: "06/01/2011", gender: "Nữ", parents: "Giuse Toản – Maria Trinh", k1: 17.5, k2: 26, tb: 21.75 },
      { stt: 25, name: "Anna Trần Thị Kiều Vân", dob: "10/10/2011", gender: "Nữ", parents: "Giuse Phong – Anna Hoa", k1: 29, k2: 23.5, tb: 26.25 },
      { stt: 26, name: "Anna Nguyễn Cẩm Tú", dob: "", gender: "Nữ", parents: "Têphanô Điền – Anna Lan", k1: null, k2: 12, tb: 12 }
    ]
  },
  {
    className: "Kinh Thánh II",
    students: [
      { stt: 1, name: "Antôn Phạm Duy Hưng", dob: "01/04/2012", gender: "Nam", parents: "Giuse Phượng – Anna Thu", k1: 32, k2: 11, tb: 21.5 },
      { stt: 2, name: "Phêrô Nguyễn Tiến Dương", dob: "07/05/2012", gender: "Nam", parents: "Phêrô Đệ - Maria Hiền", k1: 28, k2: 15, tb: 21.5 },
      { stt: 3, name: "Antôn Nguyễn Thiên Ân", dob: "12/10/2012", gender: "Nam", parents: "Antôn Dũng – Maria Dung", k1: 41.75, k2: 28.5, tb: 35.12 },
      { stt: 4, name: "Antôn Nguyễn Nhật Hoàng", dob: "27/01/2012", gender: "Nam", parents: "Antôn Trung – Maria Hà", k1: 34, k2: 15, tb: 24.5 },
      { stt: 5, name: "Phêrô Nguyễn Văn Thái", dob: "15/05/2012", gender: "Nam", parents: "Phêrô Thông – Maria Thuỷ", k1: 24.75, k2: 17, tb: 20.88 },
      { stt: 6, name: "Antôn Lê Văn Trông", dob: "08/02/2012", gender: "Nam", parents: "Phanxicô Diễn – Maria Toàn", k1: 11, k2: 12, tb: 11.5 },
      { stt: 7, name: "Phêrô Hà Anh Đức", dob: "14/01/2012", gender: "Nam", parents: "Phêrô Ánh – Têrêxa Nhan", k1: 38.5, k2: 17, tb: 27.75 },
      { stt: 8, name: "Phêrô Hoàng Tuấn Anh", dob: "21/06/2012", gender: "Nam", parents: "Phêrô Phúc – Maria Tâm", k1: 23, k2: 18, tb: 20.5 },
      { stt: 9, name: "Phaolô Trần Bảo Nhật", dob: "27/06/2012", gender: "Nam", parents: "Giuse Vĩnh – Maria Hiệu", k1: 40, k2: 29.5, tb: 34.75 },
      { stt: 10, name: "Phêrô Nguyễn Đức Mạnh", dob: "", gender: "Nam", parents: "Phêrô Linh – Maria Phượng", k1: null, k2: 10, tb: 10 },
      { stt: 11, name: "Phaolô Nguyễn Thịnh Đạt", dob: "28/11/2012", gender: "Nam", parents: "Phaolô Toán – Maria Vinh", k1: 24, k2: 16, tb: 20 },
      { stt: 12, name: "Maria Trần Thị Hoài Sang", dob: "17/04/2012", gender: "Nữ", parents: "Phêrô Chung – Maria Phúc", k1: 26.25, k2: 11, tb: 18.63 },
      { stt: 13, name: "Maria Phạm Thị Huyền Diệu", dob: "09/09/2012", gender: "Nữ", parents: "Phêrô Văn – Maria Xuyến", k1: 45.5, k2: 20, tb: 32.75 },
      { stt: 14, name: "Maria Phan Thị Quỳnh Thư", dob: "06/10/2012", gender: "Nữ", parents: "Antôn Toàn – Maria Hữu", k1: 30.5, k2: 17, tb: 23.75 },
      { stt: 15, name: "Maria Trần Thị Hồng Ly", dob: "09/01/2012", gender: "Nữ", parents: "Phêrô Trầm – Maria Hằng", k1: 50, k2: 47, tb: 48.5 },
      { stt: 16, name: "Mônicô Nguyễn Ngọc Bích", dob: "23/08/2012", gender: "Nữ", parents: "Giuse Khấn – Anna Lan", k1: 47, k2: 20, tb: 33.5 },
      { stt: 17, name: "Maria Nguyễn Thị Linh Nhi", dob: "23/11/2012", gender: "Nữ", parents: "Giuse Thanh – Maria Hạ", k1: 25.25, k2: 20, tb: 22.63 },
      { stt: 18, name: "Anna Nguyễn Thảo Vy", dob: "16/01/2012", gender: "Nữ", parents: "Giuse Đình – Anna Thiệp", k1: 36.5, k2: 30.75, tb: 33.63 },
      { stt: 19, name: "Anna Trần Thị Trà My", dob: "17/01/2012", gender: "Nữ", parents: "Giuse Hương – Maria Liên", k1: 37, k2: 18, tb: 27.5 },
      { stt: 20, name: "Maria Nguyễn Vũ Bảo Ngọc", dob: "06/08/2012", gender: "Nữ", parents: "Antôn Toản – Anna Tuyết", k1: 44, k2: 31.25, tb: 37.63 },
      { stt: 21, name: "Anna Phạm Quỳnh Chi", dob: "24/07/2012", gender: "Nữ", parents: "Giuse Phòng – Maria Thanh", k1: 38, k2: 20.5, tb: 29.25 },
      { stt: 22, name: "Maria Nguyễn Vân Anh", dob: "11/07/2012", gender: "Nữ", parents: "Giuse Trung – Maria Lợi", k1: 11, k2: 10, tb: 10.5 },
      { stt: 23, name: "Maria Nguyễn Thuỳ Linh", dob: "14/12/2012", gender: "Nữ", parents: "Giuse Thương – Maria Dung", k1: 29.25, k2: 15, tb: 22.13 },
      { stt: 24, name: "Maria Hà Phương Trinh", dob: "16/12/2012", gender: "Nữ", parents: "Phêrô Sỹ - Catalia Dung", k1: 22, k2: 16, tb: 19 }
    ]
  },
  {
    className: "Kinh Thánh I",
    students: [
      { stt: 1, name: "Antôn Nguyễn Hoàng Thái", dob: "31/08/2013", gender: "Nam", parents: "Phêrô Mến – Maria Bền", k1: 23, k2: 15, tb: 19 },
      { stt: 2, name: "Phanxicô Nguyễn Trung Kiên", dob: "25/05/2013", gender: "Nam", parents: "Maria Nguyệt", k1: 12, k2: 15, tb: 15 },
      { stt: 3, name: "Phêrô Lê Mạnh Quỳnh", dob: "23/05/2013", gender: "Nam", parents: "Phêrô Vân – Anna Hoa", k1: 11, k2: 16, tb: 13.5 },
      { stt: 4, name: "Phanxicô Hồ Gia Ân", dob: "13/03/2013", gender: "Nam", parents: "Phanxicô Dung – Maria Trọng", k1: 27.5, k2: 42.5, tb: 35 },
      { stt: 5, name: "Antôn Lê Bảo Lâm", dob: "13/09/2013", gender: "Nam", parents: "Giuse Lợi – Maria Nguyên", k1: 9, k2: 12, tb: 10.5 },
      { stt: 6, name: "Giuse Trần Bảo Long", dob: "11/01/2013", gender: "Nam", parents: "Giuse Kiên – Maria Đội", k1: 39, k2: 44.5, tb: 41.75 },
      { stt: 7, name: "Phêrô Phan Hoàng Long", dob: "21/11/2013", gender: "Nam", parents: "Phêrô Tài – Maria Ân", k1: 26, k2: 15, tb: 20.5 },
      { stt: 8, name: "Phêrô Võ Minh Tiến", dob: "19/02/2013", gender: "Nam", parents: "Phêrô Thái – Maria Huyền", k1: 27.25, k2: 29, tb: 28.13 },
      { stt: 9, name: "Giuse Nguyễn Văn Long", dob: "17/02/2013", gender: "Nam", parents: "Giuse Đợi – Maria Liên", k1: 27, k2: 22, tb: 24.5 },
      { stt: 10, name: "Giuse Phạm Gia Hưng", dob: "07/08/2013", gender: "Nam", parents: "Giuse Trọng – Maria Nga", k1: 18, k2: 13, tb: 15.5 },
      { stt: 11, name: "Giuse Trần Phan Cao", dob: "20/02/2013", gender: "Nam", parents: "Antôn Ngọc – Maria Hương", k1: 30, k2: 30.5, tb: 30.25 },
      { stt: 12, name: "Phaolô Phạm Anh Quân", dob: "26/12/2013", gender: "Nam", parents: "Phêrô Niệm – Anna Phương", k1: 26.5, k2: 35, tb: 30.75 },
      { stt: 13, name: "Giuse Lê Văn Sỹ", dob: "22/03/2013", gender: "Nam", parents: "Giuse Bảy – Luxia Xoan", k1: 34.5, k2: 31.5, tb: 33 },
      { stt: 14, name: "Phêrô Phan Hà Đông", dob: "02/08/2013", gender: "Nam", parents: "Giuse Hạ - Luxia Sang", k1: 38.75, k2: 30, tb: 34.38 },
      { stt: 15, name: "Giuse Nguyễn Văn Hưng", dob: "10/09/2013", gender: "Nam", parents: "Tín – Thường", k1: 6, k2: 4, tb: 5 },
      { stt: 16, name: "Giuse Trần Ng. Hải Đăng", dob: "12/02/2013", gender: "Nam", parents: "Giuse Viện – Anna Sương", k1: 11, k2: 9, tb: 10 },
      { stt: 17, name: "Anna Đặng Thị Bảo Trâm", dob: "08/11/2013", gender: "Nữ", parents: "Giacôbê Vinh – Anna Nhuần", k1: 37, k2: 34.75, tb: 35.88 },
      { stt: 18, name: "Maria Trần Ng. Thiên Vân", dob: "19/06/2013", gender: "Nữ", parents: "Antôn Bích – Anna Tuyết", k1: 45, k2: 39.75, tb: 42.38 },
      { stt: 19, name: "Anna Vũ Cao Thị Thuỳ Trang", dob: "12/11/2013", gender: "Nữ", parents: "Giuse Hệ - Anna Hương", k1: 32, k2: 23, tb: 27.5 },
      { stt: 20, name: "Maria Vũ Hoàng SuLim", dob: "25/07/2013", gender: "Nữ", parents: "Giuse Nghị - Maria Phúc", k1: 34, k2: 34.5, tb: 34.25 },
      { stt: 21, name: "Maria Nguyễn Thị Giáng My", dob: "17/11/2013", gender: "Nữ", parents: "Phaolô Toán – Maria Vinh", k1: 48.25, k2: 32, tb: 40.13 },
      { stt: 22, name: "Maria Phạm Thị Khánh Huyền", dob: "23/07/2013", gender: "Nữ", parents: "Antôn Chinh – Anna Oanh", k1: 49, k2: 46, tb: 47.5 },
      { stt: 23, name: "Maria Trần Thị Cẩm Vy", dob: "18/02/2013", gender: "Nữ", parents: "Giuse Bình – Maria Lợi", k1: 49, k2: 47.75, tb: 48.38 },
      { stt: 24, name: "Maria Nguyễn Thị Ngọc Trâm", dob: "29/10/2013", gender: "Nữ", parents: "Giuse Toản- Maria Trinh", k1: 23.5, k2: 34, tb: 28.75 },
      { stt: 25, name: "Maria Nguyễn Trần Thảo Vy", dob: "26/08/2013", gender: "Nữ", parents: "Giuse Tuấn – Anna Tâm", k1: 29.75, k2: 37.5, tb: 33.63 },
      { stt: 26, name: "Anna Vũ Thị Linh Đan", dob: "", gender: "Nữ", parents: "Giuse Khen – Anna Hường", k1: 25, k2: 21, tb: 23 }
    ]
  },
  {
    className: "Căn Bản III",
    students: [
      { stt: 1, name: "Giuse Hà Nguyễn Bảo Khang", dob: "18/08/2014", gender: "Nam", parents: "Giuse Tuấn – Maria Mùi", k1: 28.5, k2: 28, tb: 28.25 },
      { stt: 2, name: "Giuse Lê Đức Đồng", dob: "26/09/2014", gender: "Nam", parents: "Giuse Lợi – Maria Nguyện", k1: 39.5, k2: 26, tb: 32.75 },
      { stt: 3, name: "Phêrô Hoàng Gia Khánh", dob: "14/12/2014", gender: "Nam", parents: "Phêrô Phúc – Maria Tâm", k1: 28.75, k2: 23, tb: 25.88 },
      { stt: 4, name: "Antôn Nguyễn Nhật Huỳnh", dob: "25/11/2014", gender: "Nam", parents: "Antôn Trung – Maria Hà", k1: 30, k2: 27, tb: 28.5 },
      { stt: 5, name: "Phêrô Phan Hoàng Phi", dob: "07/08/2014", gender: "Nam", parents: "Phêrô Tài- Maria Ân", k1: 17, k2: 18, tb: 17.5 },
      { stt: 6, name: "Antôn Vũ Thanh Liêm", dob: "12/06/2014", gender: "Nam", parents: "Phêrô Ân- Maria Hữu", k1: 43.25, k2: 38, tb: 40.63 },
      { stt: 7, name: "Phanxicô Phan Hải Đăng", dob: "08/09/2014", gender: "Nam", parents: "Giuse Biết – Anna Thanh", k1: 42.75, k2: 24, tb: 33.38 },
      { stt: 8, name: "Giuse Nguyễn Tiến Dũng", dob: "10/10/2014", gender: "Nam", parents: "Giuse Lệ – Maria Quý", k1: 29, k2: 22, tb: 25.5 },
      { stt: 9, name: "Giuse Vũ Như Trịnh", dob: "12/08/2014", gender: "Nam", parents: "Giuse Khoa- Maria Tâm", k1: 24, k2: 24, tb: 24 },
      { stt: 10, name: "Giuse Nguyễn Văn Tiến", dob: "16/09/2014", gender: "Nam", parents: "Gioan Đợi- Maria Liên", k1: 22, k2: 27.25, tb: 24.63 },
      { stt: 11, name: "Maria Ng. Ngọc Tâm Đan", dob: "06/06/2014", gender: "Nữ", parents: "Giuse Khắc – Maria Thủy", k1: 49, k2: 45, tb: 47 },
      { stt: 12, name: "Maria Hà Yến Nhi", dob: "19/10/2014", gender: "Nữ", parents: "Phêrô Sỹ - Catarina Dung", k1: 36, k2: 28.75, tb: 32.38 },
      { stt: 13, name: "Maria Nguyễn Ánh Tuyết", dob: "15/11/2014", gender: "Nữ", parents: "Giuse Hướng – Maria Hiển", k1: 33.5, k2: 29, tb: 31.25 },
      { stt: 14, name: "Maria Nguyễn Lê Hà Anh", dob: "12/09/2014", gender: "Nữ", parents: "Giuse Sung- Maria Giáo", k1: 33, k2: 34.25, tb: 33.63 },
      { stt: 15, name: "Maria Trần Thị Hồng Nhung", dob: "29/03/2014", gender: "Nữ", parents: "Phêrô Chung- Maria Phúc", k1: 41, k2: 34.5, tb: 37.75 },
      { stt: 16, name: "Anna Nguyễn Thị Thanh Huyền", dob: "30/03/2014", gender: "Nữ", parents: "Antôn Nho – Anna Hằng", k1: 42, k2: 31.75, tb: 36.88 },
      { stt: 17, name: "Maria Nguyễn Ngọc Diệp", dob: "01/05/2014", gender: "Nữ", parents: "Giuse Đệ- Maria Hiền", k1: 36, k2: 29.75, tb: 32.88 },
      { stt: 18, name: "Maria Nguyễn Vũ Thảo My", dob: "10/09/2014", gender: "Nữ", parents: "Giuse Vinh – Maria Hồng", k1: 39.75, k2: 33, tb: 36.38 },
      { stt: 19, name: "Anna Phạm Thảo Chi", dob: "21/07/2014", gender: "Nữ", parents: "Phêrô Duy – Anna Linh", k1: 48.5, k2: 37.5, tb: 43 }
    ]
  },
  {
    className: "Căn Bản II",
    students: [
      { stt: 1, name: "Giuse Nguyễn Tiến Lộc", dob: "12/02/2015", gender: "Nam", parents: "Giuse Đức –Maria Yến", k1: 37, k2: 31.75, tb: 34.38 },
      { stt: 2, name: "Giuse Phạm Quốc Minh Đức", dob: "29/10/2015", gender: "Nam", parents: "Giuse Phòng –Maria Thanh", k1: 30, k2: 45.25, tb: 37.63 },
      { stt: 3, name: "Antôn Nguyễn Mạnh Hùng", dob: "15/12/2015", gender: "Nam", parents: "Antôn Trông – Maria Hảo", k1: 24, k2: 41.75, tb: 32.88 },
      { stt: 4, name: "Phêrô Lê Minh Nhật", dob: "05/08/2015", gender: "Nam", parents: "Phêrô Vân – Anna Hoa", k1: 32.75, k2: 38.5, tb: 35.63 },
      { stt: 5, name: "Phêrô Nguyễn Văn Đạt", dob: "15/09/2015", gender: "Nam", parents: "Thông – Thủy", k1: 27, k2: 40.75, tb: 33.88 },
      { stt: 6, name: "Augustino Lê Hoàng Minh Quân", dob: "04/12/2015", gender: "Nam", parents: "Hùng – Huệ", k1: 21, k2: 36.25, tb: 28.63 },
      { stt: 7, name: "Giuse Nguyễn Minh Nhật", dob: "15/08/2015", gender: "Nam", parents: "Thương- Dung", k1: 16, k2: 11, tb: 13.5 },
      { stt: 8, name: "Giuse Phan Hà Vũ Quân", dob: "20/08/2015", gender: "Nam", parents: "Hạ - Luxia Sang", k1: 40, k2: 34, tb: 37 },
      { stt: 9, name: "Antôn Phan Gia Huy", dob: "04/04/2015", gender: "Nam", parents: "Antôn Toàn – Maria Hữu", k1: 43.25, k2: 33.75, tb: 38.5 },
      { stt: 10, name: "Giuse Nguyễn Gia Bảo", dob: "27/03/2015", gender: "Nam", parents: "Linh - Phượng", k1: 31, k2: 15, tb: 23 },
      { stt: 11, name: "Antôn Đặng Nhất Long", dob: "08/02/2015", gender: "Nam", parents: "Giacôbê Vinh , Anna Nhuần", k1: 19.75, k2: 16.75, tb: 18.25 },
      { stt: 12, name: "Antôn Nguyễn Tuấn Hưng", dob: "2015", gender: "Nam", parents: "Mẹ Maria Lan", k1: 2, k2: 5, tb: 3.5 },
      { stt: 13, name: "Giuse Lê Minh Nhật", dob: "21/07/2015", gender: "Nam", parents: "Giuse Kỳ – Anna Hoa", k1: 22.5, k2: 15, tb: 18.75 },
      { stt: 14, name: "Giuse Nguyễn Thế Anh", dob: "23/09/2015", gender: "Nam", parents: "Mẹ Nguyệt", k1: 19, k2: 28.75, tb: 23.88 },
      { stt: 15, name: "Xêxilia Phan Ng. Linh Đan", dob: "25/02/2015", gender: "Nữ", parents: "Giuse Đương – Maria Thi", k1: 48, k2: 50, tb: 49 },
      { stt: 16, name: "Maria Hồ Anh Thư", dob: "21/07/2015", gender: "Nữ", parents: "Phanxico Dung –Maria Trọng", k1: 50, k2: 50, tb: 50 },
      { stt: 17, name: "Maria Nguyễn Phương Trang", dob: "29/08/2015", gender: "Nữ", parents: "Giuse Toản –Maria Trinh", k1: 39, k2: 44, tb: 41.5 },
      { stt: 18, name: "Anna Trần Thị Thu Hà", dob: "07/06/2015", gender: "Nữ", parents: "Giuse Tài – Maria Khiêm", k1: 48, k2: 42.75, tb: 45.4 },
      { stt: 19, name: "Maria Trần Nguyễn Hải Anh", dob: "11/03/2015", gender: "Nữ", parents: "Giuse Viện –Anna Sương", k1: 49, k2: 49.5, tb: 49.25 },
      { stt: 20, name: "Têrêxa Phạm Vũ Nhã Phương", dob: "01/06/2015", gender: "Nữ", parents: "Phero Thanh – Terexa Hoan", k1: 39.75, k2: 38.25, tb: 39 },
      { stt: 21, name: "Maria Phan Lê Thùy Linh", dob: "27/07/2015", gender: "Nữ", parents: "Phêrô Trung- Maria Tuyết", k1: 39.75, k2: 39.25, tb: 39.5 },
      { stt: 22, name: "Maria Trần Thị Linh Nhi", dob: "25/09/2015", gender: "Nữ", parents: "Phero Trầm – Maria Hằng", k1: 49.5, k2: 47.75, tb: 48.63 },
      { stt: 23, name: "Têrexa Lê Hoàng Thảo My", dob: "22/10/2015", gender: "Nữ", parents: "Hùng – Mậu", k1: 39.5, k2: 29, tb: 34.25 },
      { stt: 24, name: "Maria Nguyễn Thị Ngọc Vy", dob: "20/05/2015", gender: "Nữ", parents: "Giuse Dùng – Maria Dung", k1: 49.5, k2: 49.25, tb: 49.38 },
      { stt: 25, name: "Maria Lê Thị Thảo Quyên", dob: "19/06/2015", gender: "Nữ", parents: "Phêrô Nhi – Maria Toan", k1: 41.5, k2: 43.25, tb: 42.38 },
      { stt: 26, name: "Anna Nguyễn Thị Yến Nhi", dob: "16/08/2015", gender: "Nữ", parents: "Giuse Đình – Anna Thiệp", k1: 49, k2: 49.5, tb: 49.25 },
      { stt: 27, name: "Têrexa Nguyễn Mai Phương", dob: "13/02/2015", gender: "Nữ", parents: "Phêrô Hồng – Maria Chinh", k1: 41, k2: 35, tb: 38 },
      { stt: 28, name: "Maria Phan Ngọc Ánh", dob: "26/03/2015", gender: "Nữ", parents: "Giuse Triều – Anna Hồng", k1: 50, k2: 50, tb: 50 },
      { stt: 29, name: "Maria Trần Thị Ánh Viên", dob: "28/06/2015", gender: "Nữ", parents: "Antôn Ngọc, Maria Hương", k1: 49, k2: 46.5, tb: 47.75 },
      { stt: 30, name: "Maria Vũ Như Lam", dob: "25/09/2015", gender: "Nữ", parents: "Sơn – Ngân", k1: 23, k2: 25, tb: 24 },
      { stt: 31, name: "Maria Nguyễn Ngọc Trân Châu", dob: "04/02/2015", gender: "Nữ", parents: "Thanh – Hạ", k1: 34.5, k2: 45.5, tb: 40 },
      { stt: 32, name: "Anna Vũ Thị Thủy Tiên", dob: "22/12/2015", gender: "Nữ", parents: "Giuse Khen – Anna Hường", k1: 38.75, k2: 43, tb: 40.88 }
    ]
  },
  {
    className: "Căn Bản I",
    students: [
      { stt: 1, name: "Giuse Tần Su ha", dob: "2016", gender: "Nam", parents: "Long – Thương", k1: 16, k2: 22, tb: 19 },
      { stt: 2, name: "Giuse Nguyễn Tiến Dũng", dob: "2016", gender: "Nam", parents: "Đại – Tâm", k1: 15, k2: 21.75, tb: 18.38 },
      { stt: 3, name: "Giuse Hoàng Hải Đăng", dob: "2016", gender: "Nam", parents: "Tây – Hiền", k1: 16, k2: 20, tb: 18 },
      { stt: 4, name: "Antôn Nguyễn Đình Thiên", dob: "2016", gender: "Nam", parents: "Bình – Loan", k1: 13, k2: 11, tb: 12 },
      { stt: 5, name: "Antôn Lê Tùng Bách", dob: "2016", gender: "Nam", parents: "Huy – Thiện", k1: 13, k2: 12, tb: 12.5 },
      { stt: 6, name: "Giuse Trần Gia Huy", dob: "2016", gender: "Nam", parents: "Phong – Hoa", k1: 21.5, k2: 20.25, tb: 20.75 },
      { stt: 7, name: "Giuse Trương Minh Lâm", dob: "2016", gender: "Nam", parents: "Linh – Phục", k1: 39, k2: 45, tb: 42 },
      { stt: 8, name: "Antôn Vũ Hoàng Gia Bảo", dob: "2016", gender: "Nam", parents: "Nghị - Phúc", k1: 27.5, k2: 24, tb: 25.75 },
      { stt: 9, name: "Giêrado Nguyễn Duy Khánh", dob: "2016", gender: "Nam", parents: "Bắc – Minh", k1: 8, k2: 5, tb: 6.5 },
      { stt: 10, name: "Phêrô Nguyễn Tiến Nhật", dob: "2016", gender: "Nam", parents: "Bố Tuấn", k1: 12, k2: 16.5, tb: 14.25 },
      { stt: 11, name: "Auguttino Phạm Thanh Tùng", dob: "2016", gender: "Nam", parents: "Niệm – Phương", k1: 15, k2: 11, tb: 13 },
      { stt: 12, name: "Gioan Trần Nguyễn Hoàng Bách", dob: "2016", gender: "Nam", parents: "Thắng – Xuyên", k1: 21, k2: 22.75, tb: 21.88 },
      { stt: 13, name: "Giuse Nguyễn Minh Nhật", dob: "2016", gender: "Nam", parents: "Khắc – Thủy", k1: 18, k2: 29.75, tb: 23.88 },
      { stt: 14, name: "Antôn Phạm Tiến Thăng", dob: "2016", gender: "Nam", parents: "Quyền – Hương", k1: 28, k2: 21.5, tb: 24.75 },
      { stt: 15, name: "Antôn Hoàng Phước Lộc", dob: "2016", gender: "Nam", parents: "Triển – Bích", k1: 49.5, k2: 48, tb: 48.75 },
      { stt: 16, name: "Phanxico Phạm Hữu Lộc", dob: "2016", gender: "Nam", parents: "Mừng – Đường", k1: 13, k2: 16.75, tb: 14.88 },
      { stt: 17, name: "Antôn Nguyễn Huy Hoàng", dob: "2016", gender: "Nam", parents: "Hùng – Hương", k1: 30, k2: 31.75, tb: 30.88 },
      { stt: 18, name: "Phêrô Phạm Minh Thịnh", dob: "2016", gender: "Nam", parents: "Duy – Linh", k1: 40, k2: 47, tb: 43.5 },
      { stt: 19, name: "Gioan Phạm Duy Khánh", dob: "2016", gender: "Nam", parents: "Hùng – Trang", k1: 26, k2: 14, tb: 20 },
      { stt: 20, name: "Maria Nguyễn Thuỳ Trinh", dob: "2016", gender: "Nữ", parents: "Nho – Hằng", k1: 34.5, k2: 39.5, tb: 37 },
      { stt: 21, name: "Maria Phan Trâm Anh", dob: "2016", gender: "Nữ", parents: "Biết – Thanh", k1: 30, k2: 44, tb: 37 },
      { stt: 22, name: "Anna Nguyễn Gia Hân", dob: "2016", gender: "Nữ", parents: "Hùng – Hương", k1: 44, k2: 48, tb: 46 },
      { stt: 23, name: "Maria Trần Diệp My", dob: "2016", gender: "Nữ", parents: "Kiên – Đội", k1: 38, k2: 24, tb: 31 },
      { stt: 24, name: "Maria Bùi Nguyễn Khánh Vy", dob: "2016", gender: "Nữ", parents: "Mẹ Cơ", k1: 49, k2: 47.5, tb: 48.25 },
      { stt: 25, name: "Têrêxa Nguyễn Tường Vy", dob: "2016", gender: "Nữ", parents: "Hùng – Thoa", k1: 18, k2: 26.5, tb: 22.25 },
      { stt: 26, name: "Maria Phạm Trà Vy", dob: "2016", gender: "Nữ", parents: "Ngọc – Tạo", k1: 38, k2: 35, tb: 36.5 },
      { stt: 27, name: "Maria Trần Thị Nguyệt Cát", dob: "2016", gender: "Nữ", parents: "Phát – Hoài", k1: 39, k2: 48.75, tb: 43.88 },
      { stt: 28, name: "Anna Nguyễn Hoàng Linh", dob: "2016", gender: "Nữ", parents: "Trung – Lợi", k1: 24, k2: 15, tb: 19.5 },
      { stt: 29, name: "Vêrônica Trần Nguyễn HaRi", dob: "2016", gender: "Nữ", parents: "Quyển – Hạnh", k1: 42, k2: 41.75, tb: 41.88 }
    ]
  }
];

const getRank = (score) => {
  if (score === null || score === undefined) return "Chưa xếp loại";
  if (score >= 50) return "Giải Xuất Sắc";
  if (score >= 48) return "Giải Nhất";
  if (score >= 46) return "Giải Nhì";
  if (score >= 40) return "Giải Ba";
  if (score >= 25) return "Đạt";
  return "Thi Lại";
};

// Process student list
let totalStudents = 0;
const processedClasses = classesData.map(cls => {
  const students = cls.students.map(s => {
    totalStudents++;
    // Split christian name & full name
    const parts = s.name.trim().split(" ");
    let christianName = "";
    let fullName = "";
    const christianTokens = ["Giuse", "Maria", "Phêrô", "Phê-rô", "Phêro", "Anna", "Antôn", "Gioan", "Luca", "Têrêxa", "Têrexa", "Xêxilia", "Augustino", "Auguttino", "Phanxicô", "Phanxico", "Phaolô", "Phao-lô", "Mônicô", "Giêrado", "Vêrônica", "Đalênô"];
    
    if (christianTokens.includes(parts[0])) {
      christianName = parts[0];
      fullName = parts.slice(1).join(" ");
    } else {
      christianName = "";
      fullName = s.name;
    }

    return {
      stt: s.stt,
      christianName,
      fullName,
      originalName: s.name,
      dob: s.dob,
      gender: s.gender,
      parents: s.parents,
      k1: s.k1,
      k2: s.k2,
      tb: s.tb,
      rank: getRank(s.tb)
    };
  });

  return {
    className: cls.className,
    studentCount: students.length,
    students
  };
});

// Write to JSON
fs.writeFileSync("./data/bang_diem_2025_2026.json", JSON.stringify({
  schoolYear: "2025 – 2026",
  parishName: "GIÁO HỌ TÂN VẠN",
  boardName: "BAN GIÁO LÝ GIÁO HỌ TÂN VẠN",
  totalStudents,
  classes: processedClasses
}, null, 2), "utf8");

// Generate CSV with UTF-8 BOM
let csv = "\uFEFF";
csv += "BẢNG ĐIỂM GIÁO LÝ NIÊN KHÓA 2025 - 2026 - GIÁO HỌ TÂN VẠN\n";
csv += "STT,Lớp Giáo Lý,Tên Thánh & Tên Gọi,Năm Sinh,Giới Tính,Tên Bố Mẹ,Điểm Kỳ 1,Điểm Kỳ 2,Điểm TB/Năm,Xếp Loại\n";

let globalIdx = 1;
processedClasses.forEach(c => {
  c.students.forEach(s => {
    csv += `"${globalIdx++}","${c.className}","${s.originalName}","${s.dob}","${s.gender}","${s.parents}","${s.k1 ?? ''}","${s.k2 ?? ''}","${s.tb ?? ''}","${s.rank}"\n`;
  });
});

fs.writeFileSync("./data/bang_diem_2025_2026.csv", csv, "utf8");
console.log("Successfully generated JSON and CSV for 2025-2026 with " + totalStudents + " students across " + processedClasses.length + " classes!");
