library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity bin_to_bcd is
    Port ( 
        data : in STD_LOGIC_VECTOR (7 downto 0);
        q    : out STD_LOGIC_VECTOR (7 downto 0)
    ); 
end bin_to_bcd;

architecture Behavioral of bin_to_bcd is
begin
    process(data)
        variable int_val : integer;
        variable zec, unit : integer;
    begin
        int_val := to_integer(unsigned(data));
        
        if int_val > 99 then
            int_val := 0;
        end if;
        
        zec := int_val / 10;
        unit := int_val mod 10;

        if zec > 9 then
            zec := 0;
        end if;
        if unit > 9 then
            unit := 0;
        end if;
        
        q(7 downto 4) <= std_logic_vector(to_unsigned(zec, 4));
        q(3 downto 0) <= std_logic_vector(to_unsigned(unit, 4));
    end process;
end Behavioral;