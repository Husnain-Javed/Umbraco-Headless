using System.Text.Json.Serialization;

namespace MCDAPI.DTO
{
    public class UmbracoPagedResponseDto<T>
    {
        [JsonPropertyName("total")]
        public int Total { get; set; }

        [JsonPropertyName("items")]
        public List<T> Items { get; set; } = [];
    }
}
