namespace ZadanieProfisysWebApi.Repositories.Interfaces
{
    public interface ICSVService
    {
        public IEnumerable<T> ReadCSV<T>(Stream file);
        public IEnumerable<T> ReadCSV<T>(string filePath);
    }
}
