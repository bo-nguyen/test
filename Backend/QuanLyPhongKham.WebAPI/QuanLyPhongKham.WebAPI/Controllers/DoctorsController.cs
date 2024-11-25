using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.Business.Interfaces;
using QuanLyPhongKham.Business.Services;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Models.Models;

namespace QuanLyPhongKham.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly IMapper _mapper;

        public DoctorsController(IDoctorService doctorService, IMapper mapper)
        {
            _doctorService = doctorService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllDoctor()
        {
            var doctors = await _doctorService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<BacSiModel>>(doctors));
        }

        [HttpGet("{bacSiId}")]
        public async Task<IActionResult> GetDoctorById(Guid bacSiId)
        {
            //Lấy dữ liệu
            var doctorById = await _doctorService.GetByIdAsync(bacSiId);
            return Ok(_mapper.Map<BacSiModel>(doctorById));
        }

        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] BacSiModel bacSi)
        {
            int res = await _doctorService.AddAsync(_mapper.Map<BacSi>(bacSi));
            return StatusCode(201, res);
        }

        [HttpPut("{bacSiId}")]
        public async Task<IActionResult> UpdateDoctor(Guid bacSiId, [FromBody] BacSiModel bacSi)
        {
            if (bacSiId != bacSi.BacSiId)
            {
                return BadRequest("Id không giống!");
            }
            var existingBS = await _doctorService.GetByIdAsync(bacSiId);
            existingBS.HoTen = bacSi.HoTen;
            existingBS.SoDienThoai = bacSi.SoDienThoai;
            existingBS.Email = bacSi.Email;
            existingBS.DiaChi = bacSi.DiaChi;
            existingBS.SoNamKinhNghiem = bacSi.SoNamKinhNghiem;
            existingBS.GioLamViec = bacSi.GioLamViec;
            int res = await _doctorService.UpdateAsync(existingBS);
            return StatusCode(204, res);
        }

        [HttpDelete("{bacSiId}")]
        public async Task<IActionResult> DeleteDoctor(Guid bacSiId)
        {
            // Kiểm tra xem bác sĩ có tồn tại không
            var bs = await _doctorService.GetByIdAsync(bacSiId);
            if (bs == null)
            {
                // Không tìm thấy bác sĩ, trả về lỗi
                return NotFound();
            }

            // Thực hiện xóa bác sĩ
            var res = await _doctorService.DeleteAsync(bacSiId);
            if (res > 0)
            {
                // Xóa thành công
                return StatusCode(201, res);
            }
            else
            {
                // Nếu có lỗi xảy ra khi xóa, trả về mã lỗi
                return StatusCode(500);
            }
        }
    }
}
