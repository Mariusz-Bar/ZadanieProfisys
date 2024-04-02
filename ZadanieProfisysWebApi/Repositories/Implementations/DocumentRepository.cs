using Microsoft.EntityFrameworkCore;
using ZadanieProfisysWebApi.Data;
using ZadanieProfisysWebApi.Models;
using ZadanieProfisysWebApi.Repositories.Interfaces;

namespace ZadanieProfisysWebApi.Repositories.Implementations
{
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DataContext _dataContext;

        public DocumentRepository(DataContext dataContext) 
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Document>> ImportToDB(IEnumerable<Document> documents)
        {
            try
            {
                string cmd = $"TRUNCATE TABLE Documents";
                await _dataContext.Database.ExecuteSqlRawAsync(cmd);

                await _dataContext.AddRangeAsync(documents);
                await _dataContext.SaveChangesAsync();
                return documents;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<DocumentItem>> ImportToDB(IEnumerable<DocumentItem> documentItems)
        {
            try
            {
                string cmd = $"TRUNCATE TABLE DocumentItems";
                await _dataContext.Database.ExecuteSqlRawAsync(cmd);

                await _dataContext.AddRangeAsync(documentItems);
                await _dataContext.SaveChangesAsync();
                return documentItems;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<DocumentItem>> GetAllDocumentItems()
        {
            try
            {
                return await _dataContext.DocumentItems.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Document>> GetAllDocuments()
        {
            try
            {
                return await _dataContext.Documents.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> TruncateData()
        {
            try
            {
                string cmd = $"TRUNCATE TABLE Documents";
                string cmd2 = $"TRUNCATE TABLE DocumentItems";

                int rowsAffected1 = await _dataContext.Database.ExecuteSqlRawAsync(cmd);
                int rowsAffected2 = await _dataContext.Database.ExecuteSqlRawAsync(cmd2);
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<DocumentItem>> GetDocumentItems(int documentId)
        {
            try
            {
                return await _dataContext.DocumentItems.Where(d => d.DocumentId == documentId).ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
