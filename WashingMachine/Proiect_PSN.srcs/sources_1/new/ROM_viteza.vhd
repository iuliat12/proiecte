library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_unsigned.ALL;

entity ROM_vit is
 Port ( Addr_vit : in std_logic_vector(1 downto 0 );
        Data_vit : out std_logic_vector(11 downto 0));
end ROM_vit;

architecture Behavioral of ROM_vit is

type ROM_vector is array(3 downto 0) of std_logic_vector(11 downto 0);
signal ROM_vit :  ROM_vector := ("010010110000", "001111101000",
 "001100100000", "001100100000");
begin

Data_vit <= ROM_vit(conv_integer(Addr_vit));
end Behavioral;
