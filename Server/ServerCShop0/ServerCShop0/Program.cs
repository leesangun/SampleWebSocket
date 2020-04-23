using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Net.WebSockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;
using WatsonWebsocket;

//NuGet WatsonWebsocket

namespace ServerCShop0
{
    class Client{
        private readonly string _ipPort;
        WatsonWsServer _server;
        public Client(string ipPort, WatsonWsServer server)
        {
            _ipPort = ipPort;
            _server = server;
        }

        public void OnConnect()
        {
            Console.WriteLine("Client connected: " + _ipPort);
        }

        public void OnDisconnect()
        {
            Console.WriteLine("Client disconnected: " + _ipPort);
        }

        public void OnReceive(byte[] bytes)
        {
            Console.WriteLine("Message received from " + _ipPort + ": " + Encoding.UTF8.GetString(bytes));
        }

        public void Send(byte[] bytes)
        {
            _server.SendAsync(_ipPort, bytes);
        }

    }

    class ServerWatsonWs
    {
        WatsonWsServer _server = new WatsonWsServer("127.0.0.1", 8181, false);
        private ConcurrentDictionary<string, Client> _clients = new ConcurrentDictionary<string, Client>();
        public ServerWatsonWs()
        {
            _server.ClientConnected += ClientConnected;
            _server.ClientDisconnected += ClientDisconnected;
            _server.MessageReceived += MessageReceived;
            _server.Start();
        }

        private void ClientConnected(object sender, ClientConnectedEventArgs args)
        {
            _clients.TryRemove(args.IpPort, out var removed);
            Client client = new Client(args.IpPort,_server);
            _clients.TryAdd(args.IpPort, client);
            client.OnConnect();

            
        }

        private void ClientDisconnected(object sender, ClientDisconnectedEventArgs args)
        {
            if (_clients.TryGetValue(args.IpPort, out Client client))
            {
                client.OnDisconnect();
                _clients.TryRemove(args.IpPort, out var removed);
            } 
        }

        private void MessageReceived(object sender, MessageReceivedEventArgs args)
        {
            if (_clients.TryGetValue(args.IpPort, out Client client))
            {
                client.OnReceive(args.Data);

                // client.Send(Encoding.UTF8.GetBytes("Server to Client"));
                client.Send(args.Data);
            }

            
        }
    }

    static class Program
    {
        

        /// <summary>
        /// 해당 애플리케이션의 주 진입점입니다.
        /// </summary>
        [STAThread]
        static void Main()
        {
            ServerWatsonWs ws = new ServerWatsonWs();

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new Form1());
        }


        
    }
}
