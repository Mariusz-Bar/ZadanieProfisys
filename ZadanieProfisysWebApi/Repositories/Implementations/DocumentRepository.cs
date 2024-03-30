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
            await _dataContext.AddRangeAsync(documents);
            await _dataContext.SaveChangesAsync();
            return documents;
        }

        public async Task<IEnumerable<DocumentItem>> ImportToDB(IEnumerable<DocumentItem> documentItems)
        {
            await _dataContext.AddRangeAsync(documentItems);
            await _dataContext.SaveChangesAsync();
            return documentItems;
        }

        public async Task<IEnumerable<DocumentItem>> GetAllDocumentItems()
        {
            return await _dataContext.DocumentItems.ToListAsync();
        }

        public async Task<IEnumerable<Document>> GetAllDocuments()
        {
            return await _dataContext.Documents.ToListAsync();
        }

        public async Task<int> TruncateData()
        {
            string cmd = $"TRUNCATE TABLE Documents";
            string cmd2 = $"TRUNCATE TABLE DocumentItems";

            await _dataContext.Database.ExecuteSqlRawAsync(cmd);
            return await _dataContext.Database.ExecuteSqlRawAsync(cmd2);
        }

        public async Task<IEnumerable<DocumentItem>> GetDocumentItems(int documentId)
        {
            return await _dataContext.DocumentItems.Where(d => d.DocumentId == documentId).ToListAsync();
        }
    }
}
