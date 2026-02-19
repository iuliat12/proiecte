using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace atestat_Trifa_Iulia
{
    public partial class Form2 : Form
    {
        bool sus = false;
        int g = 5, v = 10, vp = 5, vieti = 5,puncte=0;
        public Form2()
        {
            InitializeComponent();
            pillar_top.Left = 700;
            bird.Left = 33;
            pillar_bottom.Left = 700;
            pillar2.Left = 1000;
            pillar3.Left = 1000;
            pillar4.Left = 1400;
            pillar5.Left = 1400;
            star.Left = pillar_top.Left+15;
            star.Top = pillar_top.Top + pillar_top.Height + 37;
        }

        private void timer_Tick(object sender, EventArgs e)
        {
            bird.Top += g;
            if (sus) bird.Top -= v;
            pillar2.Left -= vp;
            pillar_bottom.Left -= vp;
            pillar_top.Left -= vp;
            pillar3.Left -= vp;
            pillar4.Left -= vp;
            pillar5.Left -= vp;
            star.Left -= vp;
            if (pillar_top.Left < -100 && pillar2.Left < 150 && pillar4.Left < 300)
            {
                pillar_top.Visible = true;
                pillar_top.Left = 710;
            }
            if (pillar_bottom.Left < -100 && pillar3.Left < 150 && pillar5.Left < 300)
            {
                pillar_bottom.Visible = true;
                pillar_bottom.Left = 710;
            }
            if (pillar2.Left < -100 && pillar4.Left < 150 && pillar_top.Left < 300)
            {
                pillar2.Visible = true;
                pillar2.Left = 710;
            }
            if (pillar3.Left < -100 && pillar5.Left < 150 && pillar_bottom.Left < 300)
            {
                pillar3.Visible = true;
                pillar3.Left = 710;
            }
            if (pillar4.Left < -100 && pillar_top.Left < 150 && pillar2.Left < 300)
            {
                pillar4.Visible = true;
                pillar4.Left = 710;
            }
            if (pillar5.Left < -100 && pillar_bottom.Left < 150 && pillar3.Left < 300)
            {
                pillar5.Visible = true;
                pillar5.Left = 710;
            }
            if(star.Visible==false || star.Left<-56)
            {
                if (pillar2.Left >= 710)
                {
                    star.Left = pillar2.Left + 29;
                    star.Top = pillar2.Top + pillar2.Height + 37;
                    star.Visible = true;
                }
                else if(pillar4.Left >=710)
                {
                    star.Left = pillar4.Left + 29;
                    star.Top = pillar4.Top + pillar4.Height + 37;
                    star.Visible = true;
                }
                else if(pillar_top.Left >=710)
                {
                    star.Left = pillar_top.Left + 29;
                    star.Top = pillar_top.Top + 37;
                    star.Visible = true;
                }
                
            }
            if (star.Bounds.IntersectsWith(bird.Bounds) && star.Visible == true)
            {
                star.Visible = false;
                puncte++;
                score.Text = Convert.ToString(puncte);
                if(puncte==10)
                {
                    this.Hide();
                    Form4 f = new Form4();
                    f.ShowDialog();
                }
            }
            if (bird.Bounds.IntersectsWith(pillar_bottom.Bounds) && pillar_bottom.Visible == true && pillar_top.Visible == true)
            {
                vieti--;
                pillar_top.Visible = false;
                pillar_bottom.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if(vieti==0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }
            }
            if (bird.Bounds.IntersectsWith(pillar_top.Bounds) && pillar_bottom.Visible == true && pillar_top.Visible == true)
            {
                vieti--;
                pillar_top.Visible = false;
                pillar_bottom.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if (vieti == 0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }

            }
            if (bird.Bounds.IntersectsWith(pillar2.Bounds) && pillar2.Visible == true && pillar3.Visible == true)
            {
                vieti--;
                pillar2.Visible = false;
                pillar3.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if (vieti == 0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }

            }
            if (bird.Bounds.IntersectsWith(pillar3.Bounds) && pillar3.Visible == true && pillar2.Visible == true)
            {
                vieti--;
                pillar3.Visible = false;
                pillar2.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if (vieti == 0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }

            }
            if (bird.Bounds.IntersectsWith(pillar4.Bounds) && pillar4.Visible == true && pillar5.Visible == true)
            {
                vieti--;
                pillar4.Visible = false;
                pillar5.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if (vieti == 0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }

            }
            if (bird.Bounds.IntersectsWith(pillar5.Bounds) && pillar5.Visible == true && pillar4.Visible == true)
            {
                vieti--;
                pillar4.Visible = false;
                pillar5.Visible = false;
                if (vieti == 4) inima5.Visible = false;
                else if (vieti == 3) inima4.Visible = false;
                else if (vieti == 2) inima3.Visible = false;
                else if (vieti == 1) inima2.Visible = false;
                else if (vieti == 0)
                {
                    inima1.Visible = false;
                    System.Threading.Thread.Sleep(100);
                    this.Hide();
                    Form3 frm = new Form3();
                    frm.ShowDialog();
                }

            }
            if(bird.Bounds.IntersectsWith(pictureBox1.Bounds))
            {
                timer.Stop();
                this.Hide();
                Form3 f = new Form3();
                f.ShowDialog();
            }
        }
        private void Form2_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Space) sus = true;
            if (e.KeyCode == Keys.Escape) Application.Exit();
        }

        private void Form2_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Space) sus = false;
        }
    }
}
