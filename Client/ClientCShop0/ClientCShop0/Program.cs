using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WatsonWebsocket;

//NuGet WatsonWebsocket

namespace ClientCShop0
{
    class ServerWatsonWs
    {
        WatsonWsClient _client = new WatsonWsClient("127.0.0.1", 8181, false);

        public ServerWatsonWs()
        {
            _client.ServerConnected += ServerConnected;
            _client.ServerDisconnected += ServerDisconnected;
            _client.MessageReceived += MessageReceived;
            _client.Start();
        }

         void MessageReceived(object sender, MessageReceivedEventArgs args)
        {
            Console.WriteLine("Message from server: " + Encoding.UTF8.GetString(args.Data));
        }

         void ServerConnected(object sender, EventArgs args)
        {
            Console.WriteLine("Server connected");
        }

         void ServerDisconnected(object sender, EventArgs args)
        {
            Console.WriteLine("Server disconnected");
        }

        public void Send()
        {
            _client.SendAsync(Encoding.UTF8.GetBytes("test"));
        }
    }


    static class Program
    {
        public static ServerWatsonWs _ws;

        /// <summary>
        /// 해당 애플리케이션의 주 진입점입니다.
        /// </summary>
        [STAThread]
        static void Main()
        {
            _ws = new ServerWatsonWs();

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }
    }
}
