library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity main is
 Port ( 
        Optiune_viteza : in std_logic_vector(1 downto 0);
        Optiune_spalare : in std_logic;
        Optiune_incalzire : in std_logic_vector(1 downto 0);
        Optiune_clatire : in std_logic;
        Optiune_automat : in std_logic_vector(2 downto 0);
        start : in std_logic; 
        on_off: in std_logic;
        mode : in std_logic;
        reset : in std_logic;
        clk : in std_logic;
        ok : in std_logic;
        Astept_st:out STD_LOGIC;
        Alege_mod_st:out STD_LOGIC;
        Automat_st:out STD_LOGIC;
        Manual_st:out STD_LOGIC;
        Al_temp_st:out STD_LOGIC;
        Al_vit_st:out STD_LOGIC;
        Al_prespalare_st:out STD_LOGIC;
        Al_clatire_st:out STD_LOGIC;
        Confirmare_st:out STD_LOGIC;
        Incalzire_st:out STD_LOGIC;
        Spalare_st:out STD_LOGIC;
        Clatire_st:out STD_LOGIC;
        Centrifugare_st:out STD_LOGIC;
        Final_st:out STD_LOGIC;
        an: out STD_LOGIC_VECTOR(7 downto 0);
        cat: out STD_LOGIC_VECTOR(6 downto 0)
        );
end main;

architecture Behavioral of main is

component MPG is
    Port ( btn : in STD_LOGIC;
           clk : in STD_LOGIC;
           en : out STD_LOGIC);
end component;

signal buton:STD_LOGIC;

component Unitate_control is
  Port ( clk : in std_logic;
         reset:in std_logic;
         start:in std_logic;
         mode:in std_logic;
         ok:in std_logic;
         on_off:in std_logic;
         Ld_inc: out STD_LOGIC;
         En_inc: out STD_LOGIC;
         Ld_centrifugare : out STD_LOGIC;
         En_centrifugare : out STD_LOGIC; 
         Ld_clatire : out STD_LOGIC;
         En_clatire : out STD_LOGIC;
         Ld_spalare : out STD_LOGIC;
         En_spalare : out STD_LOGIC;
         Ld_total : out STD_LOGIC;
         En_total : out STD_LOGIC;
         FinCnt_centrifugare : in STD_LOGIC;
         FinCnt_clatire : in STD_LOGIC;
         FinCnt_inc : in STD_LOGIC;
         FinCnt_spalare : in STD_LOGIC;
         FinCnt_total : in STD_LOGIC;
         final_out : out STD_LOGIC;
         Astept_st:out STD_LOGIC;
         Alege_mod_st:out STD_LOGIC;
         Automat_st:out STD_LOGIC;
         Manual_st:out STD_LOGIC;
         Al_temp_st:out STD_LOGIC;
         Al_vit_st:out STD_LOGIC;
         Al_prespalare_st:out STD_LOGIC;
         Al_clatire_st:out STD_LOGIC;
         Confirmare_st:out STD_LOGIC;
         Incalzire_st:out STD_LOGIC;
         Spalare_st:out STD_LOGIC;
         Clatire_st:out STD_LOGIC;
         Centrifugare_st:out STD_LOGIC;
         Final_st:out STD_LOGIC); 
end component;


component Unitate_executie is
  Port ( clk : in STD_LOGIC;
         reset : in STD_LOGIC;
         Ld_inc: in STD_LOGIC;
         En_inc: in STD_LOGIC;
         Ld_centrifugare : in STD_LOGIC;
         En_centrifugare : in STD_LOGIC; 
         Ld_clatire : in STD_LOGIC;
         En_clatire : in STD_LOGIC;
         Ld_spalare : in STD_LOGIC;
         En_spalare : in STD_LOGIC;
         Ld_total : in std_logic;
         En_total : in std_logic;
         FinCnt_centrifugare : out STD_LOGIC;
         FinCnt_clatire : out STD_LOGIC;
         FinCnt_inc : out STD_LOGIC;
         FinCnt_spalare : out STD_LOGIC;
         FinCnt_total : out std_logic;
         Optiune_automat : in STD_LOGIC_VECTOR(2 downto 0);
         Optiune_clatire : in STD_LOGIC;
         Optiune_incalzire : in STD_LOGIC_VECTOR(1 downto 0);
         Optiune_spalare : in STD_LOGIC;
         Optiune_viteza : in STD_LOGIC_VECTOR(1 downto 0);
         mode : in std_logic;
         an: out STD_LOGIC_VECTOR(7 downto 0);
         cat: out STD_LOGIC_VECTOR(6 downto 0)
         );

end component;

 signal Ld_inc:  STD_LOGIC;
 signal En_inc:  STD_LOGIC;
 signal Ld_centrifugare :  STD_LOGIC;
 signal En_centrifugare :  STD_LOGIC; 
 signal Ld_clatire :  STD_LOGIC;
 signal En_clatire :  STD_LOGIC;
 signal Ld_spalare :  STD_LOGIC;
 signal En_spalare :  STD_LOGIC;
 signal Ld_total :  STD_LOGIC;
 signal En_total :  STD_LOGIC;
 signal FinCnt_centrifugare :  STD_LOGIC;
 signal FinCnt_clatire :  STD_LOGIC;
 signal FinCnt_inc :  STD_LOGIC;
 signal FinCnt_spalare :  STD_LOGIC;
 signal FinCnt_total :  STD_LOGIC;


begin

ok1: MPG port map(btn=>ok,clk=>clk,en=> buton);

Unit_executie1 : Unitate_executie port map(
    clk => clk,
    reset => reset,
    Ld_inc => Ld_inc, 
    En_inc => En_inc,
    Ld_centrifugare => Ld_centrifugare, 
    En_centrifugare =>  En_centrifugare,
    Ld_clatire => Ld_clatire,
    En_clatire => En_clatire, 
    Ld_spalare => Ld_spalare, 
    En_spalare => En_spalare, 
    Ld_total => Ld_total,
    En_total => En_total,
    FinCnt_centrifugare => FinCnt_centrifugare,
    FinCnt_clatire =>  FinCnt_clatire,
    FinCnt_inc =>  FinCnt_inc, 
    FinCnt_spalare => FinCnt_spalare,
    FinCnt_total => FinCnt_total,
    Optiune_automat => Optiune_automat,
    Optiune_clatire  => Optiune_clatire,
    Optiune_incalzire => Optiune_incalzire,
    Optiune_spalare => Optiune_spalare,
    Optiune_viteza => Optiune_viteza,
    mode => mode,
    an => an,
    cat => cat
    );

Unit_comanda1: Unitate_control port map(
         clk => clk ,
         reset => reset,
         start => start,
         mode => mode,
         ok => buton,
         on_off => on_off,
         Ld_inc => Ld_inc,
         En_inc => En_inc,
         Ld_centrifugare => Ld_centrifugare,
         En_centrifugare => En_centrifugare,
         Ld_clatire => Ld_clatire,
         En_clatire => En_clatire,
         Ld_spalare => Ld_spalare,
         En_spalare => En_spalare,
         Ld_total => Ld_total,
         En_total => En_total,
         FinCnt_centrifugare => FinCnt_centrifugare,
         FinCnt_clatire => FinCnt_clatire,
         FinCnt_inc => FinCnt_inc,
         FinCnt_spalare => FinCnt_spalare,
         FinCnt_total => FinCnt_total,
         Astept_st => Astept_st,
         Alege_mod_st=> Alege_mod_st,
         Automat_st=> Automat_st,
         Manual_st => Manual_st,
         Al_temp_st => Al_temp_st,
         Al_vit_st => Al_vit_st,
         Al_prespalare_st => Al_prespalare_st,
         Al_clatire_st => Al_clatire_st,
         Confirmare_st => Confirmare_st,
         Incalzire_st => Incalzire_st,
         Spalare_st => Spalare_st,
         Clatire_st => Clatire_st,
         Centrifugare_st => Centrifugare_st ,
         Final_st => Final_st );
end Behavioral;
