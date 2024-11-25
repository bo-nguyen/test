using QuanLyPhongKham.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Business.Interfaces
{
    public interface IAppointmentService:IBaseService<LichKham>
    {
        /// <summary>
        /// Lấy danh sách lịch khám theo id
        /// </summary>
        /// <param name="bacSiId">id</param>
        /// <returns>danh sách</returns>
        Task<IEnumerable<LichKham>> GetAppointmentsByDoctor(Guid bacSiId);
        /// <summary>
        /// Lấy danh sách lịch khám theo benhNhanId
        /// </summary>
        /// <param name="benhNhanId">id</param>
        /// <returns></returns>
        Task<IEnumerable<LichKham>> GetAppointmentsByPatient(Guid benhNhanId);
        Task<int> CancelAppointment(Guid id);
        Task<LichKham>? GetLichKhamLatest(Guid benhNhanId);

        Task<int> EditAsync(LichKham lichKham, Guid id);
    }
}
