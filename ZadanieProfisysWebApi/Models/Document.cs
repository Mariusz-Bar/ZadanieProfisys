using System.ComponentModel.DataAnnotations;

namespace ZadanieProfisysWebApi.Models
{
    public class Document
    {
        [Key] public int Id { get; set; }
        [Required] public string Type { get; set; } = string.Empty;
        [Required] public DateTime Date { get; set; }
        [Required] public string FirstName { get; set; } = string.Empty;
        [Required] public string LastName { get; set; } = string.Empty;
        [Required] public string City { get; set; } = string.Empty;
    }
}
