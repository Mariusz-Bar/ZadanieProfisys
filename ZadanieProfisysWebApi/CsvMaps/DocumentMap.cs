using CsvHelper.Configuration;
using ZadanieProfisysWebApi.Models;

namespace ZadanieProfisysWebApi.CsvMaps
{
    public class DocumentMap : ClassMap<Document>
    {
        public DocumentMap()
        {
            Map(m => m.Id).Ignore();
            Map(m => m.Type).Index(1).Name("Type");
            Map(m => m.Date).Index(2).Name("Date");
            Map(m => m.FirstName).Index(3).Name("FirstName");
            Map(m => m.LastName).Index(4).Name("LastName");
            Map(m => m.City).Index(5).Name("City");
        }
    }
}
