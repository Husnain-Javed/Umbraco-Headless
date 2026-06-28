using MCDAPI.DTO;
using System.Net;
using System.Text.Json;

namespace MCDAPI
{



    // ==========================================
    // Base/UmbracoBaseClient.cs
    // ==========================================
    public class MCDHTTPClient
    {
        protected readonly HttpClient HttpClient;


        public MCDHTTPClient(HttpClient httpClient)
        {
            HttpClient = httpClient;

        }

        public async Task<T?> GetAsync<T>(string url) where T : class
        {
            try
            {


                var response = await HttpClient.GetAsync(url);

                if (response.StatusCode == HttpStatusCode.NotFound)
                {

                    return null;
                }

                if (response.StatusCode == HttpStatusCode.Unauthorized)
                {

                    throw new UnauthorizedAccessException($"Umbraco API rejected the request. Check your Api-Key. URL: {url}");
                }

                response.EnsureSuccessStatusCode();

                return await response.Content.ReadFromJsonAsync<T>();
            }
            catch (HttpRequestException ex)
            {

                throw;
            }
            catch (JsonException ex)
            {

                throw;
            }
            catch (TaskCanceledException ex)
            {

                throw;
            }
        }


        public async Task<UmbracoPagedResponseDto<UmbracoContentDto>?> GetChildrenAsync(
        string parentId,
        int skip = 0,
        int take = 100)
        {
            ArgumentException.ThrowIfNullOrEmpty(parentId);

            var url = $"content?fetch=children:{parentId}&expand=all&skip={skip}&take={take}";
            return await GetAsync<UmbracoPagedResponseDto<UmbracoContentDto>>(url);
        }

        // Auto-paginates through ALL children regardless of count
        public async Task<List<UmbracoContentDto>> GetAllChildrenAsync(string parentId)
        {
            var all = new List<UmbracoContentDto>();
            int skip = 0, take = 100;

            while (true)
            {
                var page = await GetChildrenAsync(parentId, skip, take);
                if (page?.Items == null || page.Items.Count == 0) break;

                all.AddRange(page.Items);
                skip += take;

                if (all.Count >= page.Total) break;
            }

            return all;
        }
    }
}
