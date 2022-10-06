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

        public FuncionariosController(IConfiguration configuration)
        {
            _configuration = configuration;
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
                    '" + funcionario.NomeAraquivoFoto + @"'

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
                     NomeArquivoFoto = '" + funcionario.NomeAraquivoFoto + @"'
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
    }
}
