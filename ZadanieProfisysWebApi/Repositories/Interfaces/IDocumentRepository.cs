using ZadanieProfisysWebApi.Models;

namespace ZadanieProfisysWebApi.Repositories.Interfaces
{
    public interface IDocumentRepository
    {
        Task<IEnumerable<Document>> GetAllDocuments();
        Task<IEnumerable<DocumentItem>> GetAllDocumentItems();
        Task<IEnumerable<DocumentItem>> GetDocumentItems(int documentId);
        Task<IEnumerable<Document>> ImportToDB(IEnumerable<Document> documents);
        Task<IEnumerable<DocumentItem>> ImportToDB(IEnumerable<DocumentItem> documentItems);
        Task<int> TruncateData();
    }
}
