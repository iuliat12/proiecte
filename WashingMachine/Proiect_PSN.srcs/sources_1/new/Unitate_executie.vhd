library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;
use IEEE.std_logic_arith.all;

entity Unitate_executie is
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
         cat: out STD_LOGIC_VECTOR(6 downto 0));
end Unitate_executie;

architecture Behavioral of Unitate_executie is

component ROM_automat is
 Port ( Addr_mod : in std_logic_vector(2 downto 0 ); 
        Data_mod : out std_logic_vector(5 downto 0));
end component;

component ROM_clatire is
 Port ( Addr_clatire : in std_logic;
        Data_clatire : out std_logic_vector(7 downto 0));
end component;

component ROM_temp is
 Port ( Addr_temp : in std_logic_vector(1 downto 0 );
        Data_temp : out std_logic_vector(7 downto 0));
end component;

component ROM_spalare is
 Port ( Addr_spalare : in std_logic;
        Data_spalare : out std_logic_vector(7 downto 0));
end component;

component ROM_vit is
 Port ( Addr_vit : in std_logic_vector(1 downto 0 );
        Data_vit : out std_logic_vector(11 downto 0));
end component;

component CNT_centrifugare is
    Port ( Rst_centrifugare: in STD_LOGIC;
           Ld_centrifugare : in STD_LOGIC;
           En_centrifugare : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_centrifugare: out STD_LOGIC_VECTOR (4 downto 0);
           FinCnt_centrifugare : out STD_LOGIC);
end component;

component CNT_clatire is
    Port ( Data_clatire : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_clatire : in STD_LOGIC;
           Ld_clatire : in STD_LOGIC;
           En_clatire : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_clatire : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_clatire : out STD_LOGIC);
end component;

component CNT_incalzire is
    Port ( Data_inc : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_inc : in STD_LOGIC;
           Ld_inc : in STD_LOGIC;
           En_inc : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_inc : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_inc : out STD_LOGIC);
end component;

component CNT_spalare is
    Port ( Data_spalare: in STD_LOGIC_VECTOR (7 downto 0);
           Rst_spalare: in STD_LOGIC;
           Ld_spalare : in STD_LOGIC;
           En_spalare : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_spalare : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_spalare : out STD_LOGIC);
end component;

component CNT_total is
    Port ( Data_total : in STD_LOGIC_VECTOR (7 downto 0);
           Rst_total : in STD_LOGIC;
           Ld_total : in STD_LOGIC;
           En_total : in STD_LOGIC;
           clk : in STD_LOGIC;
           Num_total : out STD_LOGIC_VECTOR (7 downto 0);
           FinCnt_total : out STD_LOGIC);
end component;

component sumator_total_8b is
    Port (
        B : in STD_LOGIC_VECTOR(7 downto 0);
        C : in STD_LOGIC_VECTOR(7 downto 0);
        D : in STD_LOGIC_VECTOR(7 downto 0);
        SUM : out STD_LOGIC_VECTOR(7 downto 0)
    );
end component;

component sevenSegmentDisplay is
  Port (
  cnt: in STD_LOGIC_VECTOR(7 downto 0);
  clk: in STD_LOGIC;
  an: out STD_LOGIC_VECTOR(7 downto 0);
  cat: out STD_LOGIC_VECTOR(6 downto 0));
end component sevenSegmentDisplay;

component clock_divider is
    port (
        clk       : in std_logic;
        reset     : in std_logic;
        clock_out : out std_logic
    );
end component clock_divider;

component bin_to_bcd is
    Port ( data : in STD_LOGIC_VECTOR (7 downto 0);
           q : out STD_LOGIC_VECTOR (7 downto 0)); 
end component bin_to_bcd;

component clock_div_mici is
    port (
        clk       : in std_logic;
        reset     : in std_logic;
        clock_out : out std_logic
    );
end component clock_div_mici;



signal data_automat: std_logic_vector(5 downto 0):="000000";
signal data_timp_clatire: std_logic_vector(7 downto 0):="00000000";
signal data_timp_incalzire: std_logic_vector(7 downto 0):="00000000";
signal data_timp_spalare: std_logic_vector(7 downto 0):="00000000";
signal data_viteza: std_logic_vector(11 downto 0):="000000000000";
signal data_total: std_logic_vector(7 downto 0):="00000000";


signal num_centrifugare: std_logic_vector(4 downto 0):="00000";
signal num_clatire: std_logic_vector(7 downto 0):="00000000";
signal num_incalzire: std_logic_vector(7 downto 0):="00000000";
signal num_spalare: std_logic_vector(7 downto 0):="00000000";
signal num_total, bin_out: std_logic_vector(7 downto 0):="00000000";

signal opt_clatire, opt_spalare: std_logic;
signal opt_incalzire, opt_viteza : std_logic_vector(1 downto 0);

signal clk1,clk2: std_logic;

begin
clock_div: clock_divider port map(
    clk => clk,
    reset => reset,
    clock_out => clk1
);

ROM_automat1: ROM_automat port map(
    Addr_mod => Optiune_automat,
    Data_mod => data_automat
);

process(data_automat)
begin
case mode is
when '1' => opt_incalzire <= data_automat(5 downto 4);
            opt_viteza <= data_automat(3 downto 2);
            opt_spalare <= data_automat(1);
            opt_clatire <= data_automat(0);
when '0' => opt_incalzire <= Optiune_incalzire;
            opt_viteza <= Optiune_viteza;
            opt_spalare <= Optiune_spalare;
            opt_clatire <= Optiune_clatire;
when others => report "Eroare" severity error;
end case;
end process;

ROM_clatire1: ROM_clatire port map(
    Addr_clatire => opt_clatire,
    Data_clatire => data_timp_clatire
);

ROM_spalare1: ROM_spalare port map(
    Addr_spalare => opt_spalare,
    Data_spalare => data_timp_spalare
);

ROM_temp1: ROM_temp port map(
    Addr_temp => opt_incalzire,
    Data_temp => data_timp_incalzire
);

ROM_vit1: ROM_vit port map(
    Addr_vit => opt_viteza,
    Data_vit => data_viteza
);

CNT_incalzire1: CNT_incalzire port map(
    Data_inc => data_timp_incalzire,
    Rst_inc => reset,
    Ld_inc => Ld_inc,
    En_inc => En_inc,
    clk => clk2,
    Num_inc => num_incalzire,
    FinCnt_inc => FinCnt_inc
);

CNT_spalare1: CNT_spalare port map(
    Data_spalare => data_timp_spalare,
    Rst_spalare => reset,
    Ld_spalare => Ld_spalare,
    En_spalare => En_spalare,
    clk => clk2,
    Num_spalare => num_spalare,
    FinCnt_spalare => FinCnt_spalare
);

CNT_clatire1: CNT_clatire port map(
    Data_clatire => data_timp_clatire,
    Rst_clatire => reset,
    Ld_clatire => Ld_clatire,
    En_clatire => En_clatire,
    clk => clk2,
    Num_clatire => num_clatire,
    FinCnt_clatire => FinCnt_clatire
);

CNT_centrifugare1: CNT_centrifugare port map(
    Rst_centrifugare => reset,
    Ld_centrifugare => Ld_centrifugare,
    En_centrifugare => En_centrifugare,
    clk => clk2,
    Num_centrifugare => num_centrifugare,
    FinCnt_centrifugare => FinCnt_centrifugare
);

Sumator_total_8b1: sumator_total_8b port map(
    B => data_timp_spalare,
    C => data_timp_clatire,
    D => data_timp_incalzire,
    SUM => data_total
);

CNT_total1: CNT_total port map(
    Data_total => data_total,
    Rst_total => reset,
    Ld_total => Ld_total,
    En_total => En_total,
    clk => clk1,
    Num_total => num_total,
    FinCnt_total => FinCnt_total
);

BINtoBCD: bin_to_bcd port map(
    data => num_total,
    q => bin_out
);

sevenSegmentDisplay1: sevenSegmentDisplay port map(
    cnt => bin_out,
    clk => clk,
    an => an,
    cat => cat
);

clk_div1: clock_div_mici port map(
    clk=>clk,
    reset=>reset,
    clock_out=>clk2
);
end Behavioral;
