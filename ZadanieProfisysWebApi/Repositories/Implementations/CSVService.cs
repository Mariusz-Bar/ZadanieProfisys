using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using ZadanieProfisysWebApi.CsvMaps;
using ZadanieProfisysWebApi.Repositories.Interfaces;

namespace ZadanieProfisysWebApi.Repositories.Implementations
{
    public class CSVService : ICSVService
    {
        public IEnumerable<T> ReadCSV<T>(Stream file)
        {
            using (var reader = new StreamReader(file))
            {
                CultureInfo cultureInfo = new CultureInfo("pl-PL");
                cultureInfo.NumberFormat.NumberDecimalSeparator = ",";

                var csvConfig = new CsvConfiguration(cultureInfo)
                {
                    Delimiter = ";",
                };

                var csv = new CsvReader(reader, csvConfig);
                csv.Context.RegisterClassMap<DocumentMap>();
                csv.Context.RegisterClassMap<DocumentItemMap>();

                var records = csv.GetRecords<T>().ToList();
                return records;
            }
        }

        public IEnumerable<T> ReadCSV<T>(string filePath)
        {
            using (var reader = new StreamReader(filePath))
            {
                CultureInfo cultureInfo = new CultureInfo("pl-PL");
                cultureInfo.NumberFormat.NumberDecimalSeparator = ",";

                var csvConfig = new CsvConfiguration(cultureInfo)
                {
                    Delimiter = ";",
                };

                var csv = new CsvReader(reader, csvConfig);
                csv.Context.RegisterClassMap<DocumentMap>();
                csv.Context.RegisterClassMap<DocumentItemMap>();

                var records = csv.GetRecords<T>().ToList();
                return records;
            }
        }
    }
}
