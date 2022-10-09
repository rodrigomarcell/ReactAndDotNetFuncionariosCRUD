using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ReactAndDotNetFuncionarios.Models;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactAndDotNetFuncionarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionariosController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public FuncionariosController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        // GET: api/<FuncionariosController>
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT TOP (1000) [EmpregadoId]
                          ,[NomeEmpregado]
                          ,[Departamento]
                          ,[DataInicio]
                          ,[NomeArquivoFoto]
                      FROM [FuncionariosDB].[dbo].[Empregado]";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("CS");

            SqlDataReader sqlDataReader;

            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    sqlDataReader = cmd.ExecuteReader();
                    table.Load(sqlDataReader);

                    sqlDataReader.Close();
                    conn.Close();
                }

            }

            return new JsonResult(table);
        }

        // GET api/<FuncionariosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FuncionariosController>
        [HttpPost]
        public JsonResult Post(Funcionario funcionario)
        {
            string query = @"insert into dbo.Empregado values (
                    '" + funcionario.NomeFuncinoario + @"',
                    '" + funcionario.Departamento + @"',
                    '" + funcionario.DataInicio + @"',
                    '" + funcionario.NomeArquivoFoto + @"'

                )";


            string sqlDataSource = _configuration.GetConnectionString("CS");


            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }

            return new JsonResult("Adicionado com sucesso");
        }

        // PUT api/<FuncionariosController>/5
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] Funcionario funcionario)
        {
            string query = @"update dbo.Empregado set
                     NomeEmpregado = '" + funcionario.NomeFuncinoario + @"',
                     Departamento = '" + funcionario.Departamento + @"',
                     DataInicio = '" + funcionario.DataInicio + @"',
                     NomeArquivoFoto = '" + funcionario.NomeArquivoFoto + @"'
                     where empregadoId = '" + id + "'";


            string sqlDataSource = _configuration.GetConnectionString("CS");


            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }

            return new JsonResult("Alterado com sucesso");
        }

        // DELETE api/<FuncionariosController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE from Empregado where empregadoId = '" + id + "'";

            string sqlDataSource = _configuration.GetConnectionString("CS");

            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }

            return new JsonResult("Excluido com sucesso");
        }

        [Route("SaveFile")]
        [HttpPost()]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Fotos/" + fileName;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {

                return new JsonResult("Erro.png");
            }
        }

        [Route("ObtemNomeDepartamentos")]
        [HttpGet()]
        public JsonResult ObtemNomeDepartamentos()
        {
            string query = @"select NomeDepartamento from Departamento";

            DataTable table = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("CS");

            SqlDataReader sqlDataReader;

            using (SqlConnection conn = new SqlConnection(sqlDataSource))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    sqlDataReader = cmd.ExecuteReader();
                    table.Load(sqlDataReader);

                    sqlDataReader.Close();
                    conn.Close();
                }

            }

            return new JsonResult(table);
        }
    }
}
