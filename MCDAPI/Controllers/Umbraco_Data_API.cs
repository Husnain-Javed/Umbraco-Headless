using MCDAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace MCDAPI.Controllers
{
    [ApiController]
    [Route("api/Umbraco")]
    public class Umbraco_Data_API : ControllerBase
    {
        private readonly MCDHTTPClient httpClient;
        private readonly IConfiguration configuration;

        public Umbraco_Data_API(MCDHTTPClient httpClient, IConfiguration configuration)
        {
            this.httpClient = httpClient;
            this.configuration = configuration;
        }

        [HttpGet("GetHomePage")]
        public async Task<IActionResult> GetNavigation()
        {



            var url = "pages/home";
            var response = await httpClient.GetAsync<UmbracoContentDto>(url);
            return Ok(response);
        }

        [HttpGet("GetAppMenu")]
        public async Task<IActionResult> GetAppMenu()
        {
            var url = "pages/ApMenu";
            var response = await httpClient.GetAsync<UmbracoContentDto>(url);
            return Ok(response);
        }


        [HttpGet("GetAboutUs")]
        public async Task<IActionResult> GetAboutUs()
        {
            var url = "pages/AboutUs";
            var response = await httpClient.GetAsync<UmbracoContentDto>(url);
            return Ok(response);
        }

        [HttpGet("GetLeaders")]
        public async Task<IActionResult> GetLeaders()
        {
            var url = "pages/Leaders";
            var response = await httpClient.GetAsync<UmbracoContentDto>(url);
            return Ok(response);
        }

        [HttpGet("GetSpecialAlert")]
        public async Task<IActionResult> GetSpecialAlert()
        {
            var url = "pages/SpecialAlert";
            var response = await httpClient.GetAsync<UmbracoContentDto>(url);
            return Ok(response);
        }

        [HttpGet("Getlanguages")]
        public async Task<IActionResult> Getlanguages()
        {
            // Read from config so you don't need to redeploy to add a language
            var languages = configuration
                .GetSection("SupportedLanguages")
                .Get<List<LanguageDto>>();

            return Ok(languages);
        }




        [HttpGet("GetTranslations")]
        public async Task<IActionResult> GetTranslations()
        {
            var url = "localization/GetTranslations";
            var response = await httpClient.GetAsync<dynamic>(url);
            return Ok(response);
        }


    }
}
