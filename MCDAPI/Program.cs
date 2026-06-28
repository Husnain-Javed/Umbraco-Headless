using MCDAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<LanguageHeaderHandler>();
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
builder.Services.AddHttpClient<MCDHTTPClient>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["UmbracoApi:BaseUrl"]
        ?? throw new InvalidOperationException("UmbracoApi:BaseUrl is missing."));

    client.DefaultRequestHeaders.Add("Accept", "application/json");


}).AddHttpMessageHandler<LanguageHeaderHandler>(); ;
var app = builder.Build();
app.UseCors("AngularPolicy");
// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
