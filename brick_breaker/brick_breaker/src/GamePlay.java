import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class GamePlay extends JPanel implements ActionListener {
    private boolean play = false;
    private int score = 0;
    private int totalBricks = 21;

    private Timer timer;
    private int delay = 8;

    private int playerX = 310;
    private final int paddleWidth = 100;

    private int ballposX = 120;
    private int ballposY = 350;
    private int ballXdir = -1;
    // start with a positive Y direction so the ball initially moves DOWN toward the paddle
    private int ballYdir = 2;
    private final int ballSize = 20;

    private MapGenerator map;

    private boolean moveLeft = false;
    private boolean moveRight = false;

    public GamePlay() {
        map = new MapGenerator(3, 7);
        // Use Key Bindings instead of KeyListener for reliable input
        setFocusable(true);
        setFocusTraversalKeysEnabled(false);
        setupKeyBindings();
        timer = new Timer(delay, this);
        timer.start();


        resetGame();

        // start immediately so the ball moves without pressing Enter
        play = true;

        // ensure panel has focus so key events are received
        requestFocusInWindow();
    }

    private void resetGame() {
        score = 0; // reset score
        totalBricks = map.getRows() * map.getCols();
        play = false;
        ballposX = 120;
        ballposY = 350;
        ballXdir = -1;
        ballYdir = 2; // ensure reset also makes the ball move downwards
    }

    private void setupKeyBindings() {
        InputMap im = getInputMap(WHEN_IN_FOCUSED_WINDOW);
        ActionMap am = getActionMap();

        // Right pressed
        im.put(KeyStroke.getKeyStroke("RIGHT"), "rightPressed");
        am.put("rightPressed", new AbstractAction() {
            public void actionPerformed(ActionEvent e) { moveRight = true; moveLeft = false; }
        });
        // Right released
        im.put(KeyStroke.getKeyStroke("released RIGHT"), "rightReleased");
        am.put("rightReleased", new AbstractAction() {
            public void actionPerformed(ActionEvent e) { moveRight = false; }
        });

        // Left pressed
        im.put(KeyStroke.getKeyStroke("LEFT"), "leftPressed");
        am.put("leftPressed", new AbstractAction() {
            public void actionPerformed(ActionEvent e) { moveLeft = true; moveRight = false; }
        });
        // Left released
        im.put(KeyStroke.getKeyStroke("released LEFT"), "leftReleased");
        am.put("leftReleased", new AbstractAction() {
            public void actionPerformed(ActionEvent e) { moveLeft = false; }
        });

        // Enter to (re)start
        im.put(KeyStroke.getKeyStroke("ENTER"), "start");
        am.put("start", new AbstractAction() {
            public void actionPerformed(ActionEvent e) {
                if (!play) {
                    map = new MapGenerator(3, 7);
                    resetGame();
                    play = true;
                    requestFocusInWindow();
                }
            }
        });
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        // background
        g.setColor(Color.black);
        g.fillRect(0, 0, getWidth(), getHeight());

        // borders
        g.setColor(Color.yellow);
        g.fillRect(0, 0, 3, getHeight());
        g.fillRect(0, 0, getWidth(), 3);
        g.fillRect(getWidth() - 3, 0, 3, getHeight());

        // draw map
        map.draw((Graphics2D) g);

        // the paddle
        g.setColor(Color.green);
        g.fillRect(playerX, 550, paddleWidth, 8);

        // the ball
        g.setColor(Color.yellow);
        g.fillOval(ballposX, ballposY, ballSize, ballSize);

        // draw score
        g.setColor(Color.white);
        g.setFont(new Font("Serif", Font.BOLD, 18));
        g.drawString("Score: " + score, 560, 30);

        // draw messages
        if (!play && totalBricks == 0) {
            g.setColor(Color.green);
            g.setFont(new Font("Serif", Font.BOLD, 30));
            g.drawString("You Won! Press ENTER to restart", 150, 300);
        }
        if (!play && ballposY > 570) {
            g.setColor(Color.red);
            g.setFont(new Font("Serif", Font.BOLD, 30));
            g.drawString("Game Over, Press ENTER to restart", 120, 300);
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        int paddleSpeed = 10;
        if (moveLeft) {
            playerX -= paddleSpeed;
            if (playerX < 10) playerX = 10;
        }
        if (moveRight) {
            playerX += paddleSpeed;
            if (playerX > getWidth() - paddleWidth - 10) playerX = getWidth() - paddleWidth - 10;
        }

        timer.start();
        if (play) {
            Rectangle ballRect = new Rectangle(ballposX, ballposY, ballSize, ballSize);
            Rectangle paddleRect = new Rectangle(playerX, 550, paddleWidth, 8);

            // paddle collision -> change direction and slightly change X direction depending on where it hits
            if (ballRect.intersects(paddleRect)) {
                ballYdir = -Math.abs(ballYdir);
                int hitPos = ballposX + ballSize/2 - (playerX + paddleWidth/2);
                double norm = (double)hitPos / (paddleWidth/2.0);
                double newX = norm * 3;
                if (Math.abs(newX) < 0.5) newX = newX < 0 ? -0.5 : 0.5;
                ballXdir = (int)Math.round(newX);
                if (ballXdir == 0) ballXdir = 1;
            }

            int rows = map.getRows();
            int cols = map.getCols();
            boolean brickHit = false;
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    int[][] grid = map.getMap();
                    if (grid[i][j] > 0) {
                        int brickX = j * map.getBrickWidth() + 80;
                        int brickY = i * map.getBrickHeight() + map.getTopOffset();
                        int brickW = map.getBrickWidth();
                        int brickH = map.getBrickHeight();

                        Rectangle brickRect = new Rectangle(brickX, brickY, brickW, brickH);

                        if (ballRect.intersects(brickRect)) {
                            map.setBrickValue(0, i, j);
                            totalBricks--;
                            score += 5;
                            if (ballposX + ballSize <= brickRect.x || ballposX >= brickRect.x + brickRect.width) {
                                ballXdir = -ballXdir;
                            } else {
                                ballYdir = -ballYdir;
                            }
                            brickHit = true;
                            break;
                        }
                    }
                }
                if (brickHit) break;
            }

            ballposX += ballXdir;
            ballposY += ballYdir;

            if (ballposX < 0) {
                ballXdir = -ballXdir;
                ballposX = 0;
            }
            if (ballposY < 0) {
                ballYdir = -ballYdir;
                ballposY = 0;
            }
            if (ballposX > getWidth() - ballSize) {
                ballXdir = -ballXdir;
                ballposX = getWidth() - ballSize;
            }

            if (totalBricks <= 0) {
                play = false;
                ballXdir = 0;
                ballYdir = 0;
            }

            if (ballposY > 570) {
                play = false;
                ballXdir = 0;
                ballYdir = 0;
            }
        }
        repaint();
    }
}
