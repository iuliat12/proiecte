import java.util.*;
import java.net.*;
import java.io.*;
public class ClientHandler implements Runnable{
    private Socket socket=null;
    private DataInputStream in=null;
    private DataOutputStream out=null;

    public ClientHandler(Socket s){
        this.socket=s;
        try{
            in=new DataInputStream(new BufferedInputStream(socket.getInputStream()));
            out=new DataOutputStream(socket.getOutputStream());
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }

    @Override

    public void run(){
        String message="";
        try{
            while(!message.equals("Over")){
                message=in.readUTF();
                System.out.println("Received: "+message);
                broadcast(message);
            }
        }
        catch(IOException e){
            System.out.println("Client disconnected.");
            return;
        }
        finally{
            try{
                Server.clients.remove(this);
                socket.close();
                in.close();
                out.close();
            }
            catch(IOException e){
                e.printStackTrace();
            }
        }
    }
    public void broadcast(String message){
        for(ClientHandler client: Server.clients){
            try{
                if(client!=this){
                    client.out.writeUTF(message);
                }
            }
            catch(IOException e){
                e.printStackTrace();
                return;
            }
        }
    }



}
