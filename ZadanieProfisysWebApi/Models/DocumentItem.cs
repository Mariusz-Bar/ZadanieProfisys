using System.ComponentModel.DataAnnotations;

namespace ZadanieProfisysWebApi.Models
{
    public class DocumentItem
    {
        [Key] public int Id { get; set; }
        [Required] public int DocumentId { get; set; }
        [Required] public string Ordinal { get; set; } = string.Empty;
        [Required] public string Product { get; set; } = string.Empty;
        [Required] public int Quantity { get; set; }
        [Required] public float Price { get; set; }
        [Required] public int TaxRate { get; set; }
    }
}
