using Microsoft.EntityFrameworkCore;
using ZadanieProfisysWebApi.Models;

namespace ZadanieProfisysWebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentItem> DocumentItems { get; set; }
    }
}
