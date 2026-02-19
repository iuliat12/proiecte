library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.numeric_std.ALL;


entity ROM_automat is
 Port ( Addr_mod : in std_logic_vector(2 downto 0 );
        Data_mod : out std_logic_vector(5 downto 0));
end ROM_automat;

architecture Behavioral of ROM_automat is

type ROM_vector is array(0 to 7) of std_logic_vector(5 downto 0);
  
signal ROM_automat :  ROM_vector := (
0=>"001100", 
1=>"100000",
2=> "010101",
3=> "010110", 
4=>"111101", 
5=>"111101", --de aici incolo nu mai sunt alte programe
6=>"111101", 
7=>"111101"); 
begin

process(Addr_mod)
begin

Data_mod <= ROM_automat(to_integer(unsigned(Addr_mod)));
end process;
end Behavioral;
