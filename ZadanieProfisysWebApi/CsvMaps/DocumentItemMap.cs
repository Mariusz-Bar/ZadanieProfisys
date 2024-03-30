using CsvHelper.Configuration;
using ZadanieProfisysWebApi.Models;

namespace ZadanieProfisysWebApi.CsvMaps
{
    public class DocumentItemMap : ClassMap<DocumentItem>
    {
        public DocumentItemMap()
        {
            Map(m => m.DocumentId).Index(0).Name("DocumentId");
            Map(m => m.Ordinal).Index(1).Name("Ordinal");
            Map(m => m.Product).Index(2).Name("Product");
            Map(m => m.Quantity).Index(3).Name("Quantity");
            Map(m => m.Price).Index(4).Name("Price");
            Map(m => m.TaxRate).Index(5).Name("TaxRate");
            Map(m => m.Id).Ignore();
        }
    }
}
