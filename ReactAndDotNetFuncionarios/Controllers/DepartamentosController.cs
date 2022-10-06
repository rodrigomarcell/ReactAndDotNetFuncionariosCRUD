using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ReactAndDotNetFuncionarios.Models;
using System.Data;

namespace ReactAndDotNetFuncionarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DepartamentosController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select departamentoId, NomeDepartamento from dbo.Departamento";

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

        [HttpPost]
        public JsonResult Post(Departamento departamento)
        {
            string query = @"insert into dbo.Departamento values ('" + departamento.NomeDepartamento + @"')";

          
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

        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody]Departamento departamento)
        {
            string query = @"UPDATE Departamento SET NomeDepartamento = '"+departamento.NomeDepartamento+"' where departamentoId = " + id;

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

            return new JsonResult("Atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE from Departamento where DepartamentoId = '" + id + "'";

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
