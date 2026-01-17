import java.net.*;
import java.io.*;
import java.util.*;

public class Server {
    private ServerSocket ss = null;

    public static ArrayList<ClientHandler> clients = new ArrayList<>();

    public Server(int port) {
        try {
            ss = new ServerSocket(port);
            System.out.println("Server started on port " + port);
            System.out.println("Waiting for clients...");

            while (true) {
                Socket s = ss.accept();
                System.out.println("New client connected: " + s);

                ClientHandler clientHandler = new ClientHandler(s);

                clients.add(clientHandler);

                Thread t = new Thread(clientHandler);
                t.start();
            }
        } catch (IOException e) {
            System.out.println("Server Error: " + e.getMessage());
        } finally {
            try {
                if (ss != null) ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}