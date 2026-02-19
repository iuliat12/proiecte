library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
  
entity clock_div_mici is
    port (
        clk       : in std_logic;
        reset     : in std_logic;
        clock_out : out std_logic
    );
end clock_div_mici;
  
architecture bhv of clock_div_mici is
    signal count : integer := 1;
    signal tmp   : std_logic := '0';
begin
    process(clk, reset)
    begin
        if reset = '1' then
            count <= 1;
            tmp <= '0';
        elsif rising_edge(clk) then
            count <= count + 1;
            if count = 14100111 then --11100001
                tmp <= not tmp;
                count <= 1;
            end if;
        end if;
    end process;
    
    clock_out <= tmp;
end bhv;