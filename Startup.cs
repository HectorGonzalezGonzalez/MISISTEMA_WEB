using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MISISTEMA_WEB.Startup))]
namespace MISISTEMA_WEB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
