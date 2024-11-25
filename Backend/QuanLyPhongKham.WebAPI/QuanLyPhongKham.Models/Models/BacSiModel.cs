using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Models
{
    public class BacSiModel
    {
        public Guid BacSiId { get; set; }
        public Guid? KhoaId { get; set; }
        public string MaBacSi { get; set; }
        public string HoTen { get; set; }
        public string? HinhAnh { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public string? TenBangCap { get; set; }
        public int? SoNamKinhNghiem { get; set; }
        public string? GioLamViec { get; set; }
    }
}
