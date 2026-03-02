import java.awt.*;

public class MapGenerator {
    private int map[][];
    private int brickWidth;
    private int brickHeight;
    private int topOffset = 20;

    public MapGenerator(int row,int col){
        map=new int[row][col];
        for(int i=0;i<map.length;i++){
            for(int j=0;j<map[0].length;j++){
                map[i][j]=1;
            }
        }
        brickWidth=540/col;
        brickHeight=150/row;
    }

    public void draw(java.awt.Graphics2D g){
        for(int i=0;i<map.length;i++)
            for(int j=0;j<map[0].length;j++){
                if(map[i][j]>0){
                    g.setColor(new Color(160,46,84));
                    g.fillRect(j*brickWidth+80, i*brickHeight+topOffset, brickWidth, brickHeight);
                    g.setStroke(new BasicStroke(3));
                    g.setColor(Color.black);
                    g.drawRect(j*brickWidth+80, i*brickHeight+topOffset, brickWidth, brickHeight);
                }
            }
    }

    public void setBrickValue(int value,int row,int col){
        map[row][col]=value;
    }

    public int[][] getMap() {
        return map;
    }

    public int getBrickWidth() {
        return brickWidth;
    }

    public int getBrickHeight() {
        return brickHeight;
    }

    public int getRows() {
        return map.length;
    }

    public int getCols() {
        return map[0].length;
    }

    public int getTopOffset() {
        return topOffset;
    }
}
