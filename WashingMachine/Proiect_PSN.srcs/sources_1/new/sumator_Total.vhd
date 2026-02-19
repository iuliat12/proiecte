library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity sumator_total_8b is
    Port (
        B : in STD_LOGIC_VECTOR(7 downto 0);  -- timp clatire
        C : in STD_LOGIC_VECTOR(7 downto 0);  -- timp spalare
        D : in STD_LOGIC_VECTOR(7 downto 0);  -- timp incalzire
        SUM : out STD_LOGIC_VECTOR(7 downto 0) 
    );
end sumator_total_8b;

architecture Behavioral of sumator_total_8b is
begin
    process(B, C, D)
        variable temp_d : integer;
        variable temp_d_min : integer;
        variable suma_totala : integer;
    begin
        temp_d := to_integer(unsigned(D));
        temp_d_min := (temp_d / 60) + 1;  
        if temp_d_min > 99 then
            temp_d_min := 99;
        end if;
        suma_totala := to_integer(unsigned(B)) + to_integer(unsigned(C)) + temp_d_min;
        if suma_totala > 255 then
            suma_totala := 255;
        end if;
        
        SUM <= std_logic_vector(to_unsigned(suma_totala, 8));
    end process;
end Behavioral;