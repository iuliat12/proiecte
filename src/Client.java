import java.net.*;
import java.io.*;
import java.util.*;

public class Client {
    private Socket s = null;
    private DataInputStream serverIn = null;
    private DataOutputStream out = null;
    private Scanner keyboard = null;

    public Client(String address, int port) {
        try {
            s = new Socket(address, port);
            System.out.println("Connected");

            serverIn = new DataInputStream(new BufferedInputStream(s.getInputStream()));
            out = new DataOutputStream(s.getOutputStream());
            keyboard = new Scanner(System.in);

            Thread readMessage = new Thread(() -> {
                try {
                    while (true) {
                        String msg = serverIn.readUTF();
                        System.out.println(msg);
                    }
                } catch (IOException e) {
                    System.out.println("Connection lost.");
                }
            });
            readMessage.start();

            String m = "";
            while (!m.equals("Over")) {
                if (keyboard.hasNextLine()) {
                    m = keyboard.nextLine();
                    out.writeUTF(m);
                }
            }

            s.close();
            keyboard.close();

        } catch (IOException e) {
            System.out.println(e);
        }
    }
}