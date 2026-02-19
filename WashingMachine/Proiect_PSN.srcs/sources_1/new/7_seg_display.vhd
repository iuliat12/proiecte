library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

entity sevenSegmentDisplay is
  Port (
    cnt : in STD_LOGIC_VECTOR(7 downto 0);
    clk : in STD_LOGIC;
    an  : out STD_LOGIC_VECTOR(7 downto 0);
    cat : out STD_LOGIC_VECTOR(6 downto 0)
  );
end sevenSegmentDisplay;

architecture Behavioral of sevenSegmentDisplay is
  signal counter : integer:=0;
  signal digit_index : std_logic := '0';
  signal muxDigit : std_logic_vector(3 downto 0);
begin

  process(clk)
  begin
    if rising_edge(clk) then
      if counter = 500000 then
        counter <= 0;
        digit_index <= not digit_index;
      else
       counter <= counter + 1;
      end if;
    end if;
  end process;

  process(digit_index, cnt)
  begin
    if digit_index = '0' then
      muxDigit <= cnt(3 downto 0);
      an <= "11111110";
    else
      muxDigit <= cnt(7 downto 4);
      an <= "11111101";
    end if;
  end process;

  process(muxDigit)
  begin
    case muxDigit is
      when "0000" => cat <= "1000000";
      when "0001" => cat <= "1111001";
      when "0010" => cat <= "0100100";
      when "0011" => cat <= "0110000";
      when "0100" => cat <= "0011001";
      when "0101" => cat <= "0010010";
      when "0110" => cat <= "0000010";
      when "0111" => cat <= "1111000";
      when "1000" => cat <= "0000000";
      when "1001" => cat <= "0010000";
      when "1010" => cat <= "0001000";
      when "1011" => cat <= "0000011";
      when "1100" => cat <= "1000110";
      when "1101" => cat <= "0100001";
      when "1110" => cat <= "0000110";
      when "1111" => cat <= "0001110";
      when others => cat <= "1111111";
    end case;
  end process;

end Behavioral;
