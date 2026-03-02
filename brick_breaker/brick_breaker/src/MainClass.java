import javax.swing.JFrame;

public class MainClass {
    public static void main(String[] args){
        JFrame frame=new JFrame("BrickBreaker");
        frame.setSize(800,600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);

        GamePlay gameplay=new GamePlay();
        frame.add(gameplay);

        frame.setVisible(true);

        gameplay.requestFocusInWindow();

    }

}
