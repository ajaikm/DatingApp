using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
         public Task<User> Register(User user,string password);

         public Task<User> Login(string username,string password);

         public Task<bool> IsUserExists(string username);
    }
}