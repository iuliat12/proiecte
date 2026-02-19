library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_arith.ALL;

entity ROM_spalare is
 Port ( Addr_spalare : in std_logic;
        Data_spalare : out std_logic_vector(7 downto 0));
end ROM_spalare;

architecture Behavioral of ROM_spalare is

type ROM_vector is array(1 downto 0) of std_logic_vector(7 downto 0);
signal ROM_spalare :  ROM_vector := (
1=>"00011110",
0=>"00010100");
begin

Data_spalare <= ROM_spalare(conv_integer(Addr_spalare));
end Behavioral;
