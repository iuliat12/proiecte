
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity ROM_temp is
 Port ( Addr_temp : in std_logic_vector(1 downto 0 );
        Data_temp : out std_logic_vector(7 downto 0));
end ROM_temp;

architecture Behavioral of ROM_temp is

type ROM_vector is array(3 downto 0) of std_logic_vector(7 downto 0);
signal ROM_incalzire :  ROM_vector := (3=>"10010110",
2=> "01011010", 
1=> "00110010", 
0=> "00011110"); --secunde
begin

Data_temp <= ROM_incalzire(conv_integer(Addr_temp));
end Behavioral;
