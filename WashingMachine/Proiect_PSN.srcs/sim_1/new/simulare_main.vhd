library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity simularemain is
end simularemain;

architecture Behavioral of simularemain is

component main is
    Port (
        Optiune_viteza : in std_logic_vector(1 downto 0);
        Optiune_spalare : in std_logic;
        Optiune_incalzire : in std_logic_vector(1 downto 0);
        Optiune_clatire : in std_logic;
        Optiune_automat : in std_logic_vector(2 downto 0);
        start : in std_logic; 
        on_off : in std_logic;
        mode : in std_logic;
        reset : in std_logic;
        clk : in std_logic;
        ok : in std_logic;
        Astept_st : out std_logic;
        Alege_mod_st : out std_logic;
        Automat_st : out std_logic;
        Manual_st : out std_logic;
        Al_temp_st : out std_logic;
        Al_vit_st : out std_logic;
        Al_prespalare_st : out std_logic;
        Al_clatire_st : out std_logic;
        Confirmare_st : out std_logic;
        Incalzire_st : out std_logic;
        Spalare_st : out std_logic;
        Clatire_st : out std_logic;
        Centrifugare_st : out std_logic;
        Final_st : out std_logic
    );
end component;

signal clk, ok, Optiune_spalare, Optiune_clatire, reset, mode, on_off : std_logic;
signal Optiune_incalzire, Optiune_viteza : std_logic_vector(1 downto 0);
signal Optiune_automat : std_logic_vector(2 downto 0);
signal Automat_st : std_logic;
signal Astept_st : std_logic;
signal Manual_st : std_logic;
signal Al_temp_st : std_logic;
signal Al_mod_st : std_logic;
signal Al_vit_st : std_logic;
signal Al_prespalare_st : std_logic;
signal Al_clatire_st : std_logic;
signal Confirmare_st : std_logic;
signal Incalzire_st : std_logic;
signal Spalare_st : std_logic;
signal Clatire_st : std_logic;
signal Centrifugare_st : std_logic;
signal Final_st : std_logic;
signal start : std_logic;

begin

ust1: main port map(
    Optiune_viteza => Optiune_viteza,
    Optiune_spalare => Optiune_spalare,
    Optiune_incalzire => Optiune_incalzire,
    Optiune_clatire => Optiune_clatire,
    Optiune_automat => Optiune_automat,
    start => start,
    on_off => on_off,
    mode => mode,
    reset => reset,
    clk => clk,
    ok => ok,
    Astept_st => Astept_st,
    Alege_mod_st => Al_mod_st,
    Automat_st => Automat_st,
    Manual_st => Manual_st,
    Al_temp_st => Al_temp_st,
    Al_vit_st => Al_vit_st,
    Al_prespalare_st => Al_prespalare_st,
    Al_clatire_st => Al_clatire_st,
    Confirmare_st => Confirmare_st,
    Incalzire_st => Incalzire_st,
    Spalare_st => Spalare_st,
    Clatire_st => Clatire_st,
    Centrifugare_st => Centrifugare_st,
    Final_st => Final_st
);

clock : process
begin
    clk <= '0';
    wait for 10 ns;
    clk <= '1';
    wait for 10 ns;
end process;

process
begin
    reset <= '1';
    ok <= '0';
    start <= '0';
    on_off <= '0';
    mode <= '0';
    Optiune_automat <= "000";
    Optiune_spalare <= '0';
    Optiune_clatire <= '0';
    Optiune_viteza <= "00";
    Optiune_incalzire <= "00";
    
    wait for 20 ns;
    
    reset <= '0';
    on_off <= '1';
    wait for 20 ns;

    on_off <= '0';
    mode <= '1';
    ok <= '1';
    wait for 20 ns;
    ok <= '0';
    wait for 20 ns;

    Optiune_automat <= "010";
    ok <= '1';
    wait for 20 ns;
    ok <= '0';
    wait for 20 ns;

    ok<='1';
    wait for 20ns;
    ok<='0';
    wait for 20ns;
    
    start <= '1';
    wait for 20 ns;
    start <= '0';

    wait;
end process;

end Behavioral;
