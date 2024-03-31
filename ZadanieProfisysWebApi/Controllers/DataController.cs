using Microsoft.AspNetCore.Mvc;
using ZadanieProfisysWebApi.Models;
using ZadanieProfisysWebApi.Repositories.Interfaces;

namespace ZadanieProfisysWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly ICSVService _csvService;
        private readonly IDocumentRepository _documentRepository;

        public DataController(ICSVService csvService, IDocumentRepository documentRepository)
        {
            _csvService = csvService;
            _documentRepository = documentRepository;
        }

        [HttpPost("UploadDocumentsCsv")]
        public async Task<IActionResult> GetFileData([FromForm] IFormFileCollection file)
        {
            var documents = _csvService.ReadCSV<Document>(file[0].OpenReadStream());

            //add data controll
            await _documentRepository.ImportToDB(documents);
            return Ok();  
        }

        [HttpPost("UploadDocumentItemsCsv")]
        public async Task<IActionResult> GetFileDataTest([FromForm] IFormFileCollection file)
        {
            var documentItems = _csvService.ReadCSV<DocumentItem>(file[0].OpenReadStream());

            //add data controll
            await _documentRepository.ImportToDB(documentItems);
            return Ok();
        }

        [HttpPost("ProcessCsvFilesFromDirectory")]
        public async Task<IActionResult> LoadDocumentToDatabase()
        {
            var documents = _csvService.ReadCSV<Document>(@"CsvFiles\Documents.csv");
            var documentItems = _csvService.ReadCSV<DocumentItem>(@"CsvFiles\DocumentItems.csv");

            await _documentRepository.ImportToDB(documents);
            await _documentRepository.ImportToDB(documentItems);

            return Ok();
        }

        [HttpDelete("TruncateData")]
        public async Task<IActionResult> DeleteData()
        {
            var result = await _documentRepository.TruncateData();
            return Ok(result);
        }

        [HttpGet("GetAllDocuments")]
        public async Task<IActionResult> GetAllDocuments()
        {
            var result = await _documentRepository.GetAllDocuments();
            return Ok(result);
        }

        [HttpGet("GetAllDocumentItems")]
        public async Task<IActionResult> GetAllDocumentItems()
        {
            var result = await _documentRepository.GetAllDocumentItems();
            return Ok(result);
        }

        [HttpGet("GetDocumentItems/{id}")]
        public async Task<IActionResult> GetDocumentItems(int id)
        {
            var result = await _documentRepository.GetDocumentItems(id);
            return Ok(result);
        }
    }
}
