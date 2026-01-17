import javax.swing.*;
import javax.swing.table.*;
import java.awt.*;
import java.sql.*;
import java.util.Vector;

public class AtelierApp extends JFrame {
    private final String url = "jdbc:mysql://localhost:3306/Atelier_Reparatii";
    private final String user = "root";
    private final String password = "Iulia120705.";

    private JPanel cardPanel;
    private CardLayout cardLayout;

    private final Color PRIMARY_COLOR = new Color(197, 134, 155);
    private final Color SECONDARY_COLOR = new Color(179, 41, 98);
    private final Color BACKGROUND_COLOR = new Color(255, 228, 225);

    public AtelierApp() {
        setTitle("Gestiune Atelier");
        setSize(1000, 750);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        cardLayout = new CardLayout();
        cardPanel = new JPanel(cardLayout);
        cardPanel.setBackground(BACKGROUND_COLOR);

        cardPanel.add(creazaMeniuPrincipal(), "MENIU");

        add(cardPanel);
        cardLayout.show(cardPanel, "MENIU");
    }

    private JPanel creazaMeniuPrincipal() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(BACKGROUND_COLOR);

        JPanel header = new JPanel();
        header.setBackground(SECONDARY_COLOR);
        header.setPreferredSize(new Dimension(1000, 80));
        JLabel title = new JLabel("SISTEM GESTIUNE ATELIER");
        title.setForeground(Color.WHITE);
        title.setFont(new Font("Segoe UI", Font.BOLD, 24));
        header.add(title);
        panel.add(header, BorderLayout.NORTH);

        JPanel grid = new JPanel(new GridLayout(4, 2, 20, 20));
        grid.setBackground(BACKGROUND_COLOR);
        grid.setBorder(BorderFactory.createEmptyBorder(30, 80, 30, 80));

        grid.add(creazaButonMeniu("Vizualizare Tabele", "VIEW_TABLES"));
        grid.add(creazaButonMeniu("Adăugare Piesă Nouă", "CREATE_PIESA"));
        grid.add(creazaButonMeniu("Actualizare Preț Piesă", "UPDATE_PRICE"));
        grid.add(creazaButonMeniu("Devize Nefinalizate", "INTEROGARE_1"));
        grid.add(creazaButonMeniu("Piese Cantitate Minimă", "INTEROGARE_2"));
        grid.add(creazaButonMeniu("Statistici Depanatori", "INTEROGARE_3"));
        grid.add(creazaButonMeniu("Lichidare Istoric", "DELETE_OLD"));

        panel.add(grid, BorderLayout.CENTER);
        return panel;
    }

    private JButton creazaButonMeniu(String text, String target) {
        JButton btn = new JButton(text);
        btn.setFont(new Font("Segoe UI", Font.BOLD, 15));
        btn.setBackground(PRIMARY_COLOR);
        btn.setForeground(Color.WHITE);
        btn.setFocusPainted(false);
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btn.addActionListener(e -> handlingNavigare(target));
        return btn;
    }

    private void handlingNavigare(String target) {
        switch (target) {
            case "VIEW_TABLES" -> deschideSelectieTabel();
            case "CREATE_PIESA" -> deschideFormularAdaugarePiesa();
            case "UPDATE_PRICE" -> deschideFormularUpdatePret();
            case "INTEROGARE_1" -> deschidePaginaCautare("Data Constatare (YYYY-MM-DD):", "2025-03-01", this::getSql1303);
            case "INTEROGARE_2" -> deschidePaginaRezultate("Piese Tip Șurub - Cantitate Minimă", getSql1305());
            case "INTEROGARE_3" -> deschidePaginaRezultate("Statistici Financiare 2025", getSql1306());
            case "DELETE_OLD" -> executaDeleteProcedural();
        }
    }

    private void deschideFormularAdaugarePiesa() {
        JTextField idField = new JTextField();
        JTextField descriereField = new JTextField();
        JTextField cantitateField = new JTextField();
        JTextField fabricantField = new JTextField();
        JTextField pretField = new JTextField();

        Object[] message = {
                "ID Piesă (id_p):", idField,
                "Descriere:", descriereField,
                "Cantitate Stoc:", cantitateField,
                "Fabricant:", fabricantField,
                "Preț (pret_c):", pretField
        };

        int option = JOptionPane.showConfirmDialog(null, message, "Adaugă Piesă Nouă", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            try (Connection conn = DriverManager.getConnection(url, user, password);
                 PreparedStatement pstmt = conn.prepareStatement("INSERT INTO Piesa (id_p, descriere, cantitate_stoc, fabricant, pret_c) VALUES (?, ?, ?, ?, ?)")) {

                pstmt.setInt(1, Integer.parseInt(idField.getText()));
                pstmt.setString(2, descriereField.getText());
                pstmt.setInt(3, Integer.parseInt(cantitateField.getText()));
                pstmt.setString(4, fabricantField.getText());
                pstmt.setDouble(5, Double.parseDouble(pretField.getText()));

                pstmt.executeUpdate();
                JOptionPane.showMessageDialog(this, "Piesa a fost adăugată!");
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Eroare: " + ex.getMessage());
            }
        }
    }

    private void deschideFormularUpdatePret() {
        JTextField idField = new JTextField();
        JTextField pretNouField = new JTextField();
        Object[] message = { "ID Piesă (id_p):", idField, "Preț Nou (pret_c):", pretNouField };

        int option = JOptionPane.showConfirmDialog(null, message, "Actualizare Preț", JOptionPane.OK_CANCEL_OPTION);
        if (option == JOptionPane.OK_OPTION) {
            try (Connection conn = DriverManager.getConnection(url, user, password);
                 PreparedStatement pstmt = conn.prepareStatement("UPDATE Piesa SET pret_c = ? WHERE id_p = ?")) {
                pstmt.setDouble(1, Double.parseDouble(pretNouField.getText()));
                pstmt.setInt(2, Integer.parseInt(idField.getText()));
                if (pstmt.executeUpdate() > 0) {
                    JOptionPane.showMessageDialog(this, "Preț actualizat!");
                } else {
                    JOptionPane.showMessageDialog(this, "Piesa nu a fost găsită.");
                }
            } catch (Exception ex) {
                JOptionPane.showMessageDialog(this, "Eroare: " + ex.getMessage());
            }
        }
    }

    private void deschideSelectieTabel() {
        JPanel selectPanel = new JPanel(new GridBagLayout());
        selectPanel.setBackground(BACKGROUND_COLOR);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(15, 15, 15, 15);
        JLabel lbl = new JLabel("Selectați tabelul:");
        lbl.setFont(new Font("Segoe UI", Font.BOLD, 18));
        String[] tabele = {"Deviz", "Piesa", "Piesa_Deviz", "Persoana"};
        JComboBox<String> comboTabele = new JComboBox<>(tabele);
        JButton btnVezi = new JButton("AFIȘEAZĂ");
        styleButton(btnVezi, PRIMARY_COLOR);
        JButton btnBack = new JButton("REVENIRE");
        styleButton(btnBack, SECONDARY_COLOR);
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        selectPanel.add(lbl, gbc);
        gbc.gridy = 1; selectPanel.add(comboTabele, gbc);
        gbc.gridy = 2; gbc.gridwidth = 1;
        selectPanel.add(btnVezi, gbc);
        gbc.gridx = 1; selectPanel.add(btnBack, gbc);
        cardPanel.add(selectPanel, "SELECT_TABLE");
        cardLayout.show(cardPanel, "SELECT_TABLE");
        btnVezi.addActionListener(e -> deschidePaginaRezultate("Tabel: " + comboTabele.getSelectedItem(), "SELECT * FROM " + comboTabele.getSelectedItem()));
        btnBack.addActionListener(e -> cardLayout.show(cardPanel, "MENIU"));
    }

    private void deschidePaginaRezultate(String titlu, String query) {
        JPanel resultPanel = new JPanel(new BorderLayout());
        resultPanel.setBackground(BACKGROUND_COLOR);
        JPanel resHeader = new JPanel();
        resHeader.setBackground(PRIMARY_COLOR);
        JLabel lblTitlu = new JLabel(titlu.toUpperCase());
        lblTitlu.setForeground(Color.WHITE);
        lblTitlu.setFont(new Font("Segoe UI", Font.BOLD, 18));
        resHeader.add(lblTitlu);
        DefaultTableModel model = new DefaultTableModel() {
            @Override public boolean isCellEditable(int row, int column) { return false; }
        };
        JTable table = new JTable(model);
        styleTable(table);
        incarcaDateInModel(query, model);
        JButton btnBack = new JButton("ÎNAPOI");
        styleButton(btnBack, SECONDARY_COLOR);
        btnBack.addActionListener(e -> cardLayout.show(cardPanel, "MENIU"));
        resultPanel.add(resHeader, BorderLayout.NORTH);
        resultPanel.add(new JScrollPane(table), BorderLayout.CENTER);
        resultPanel.add(btnBack, BorderLayout.SOUTH);
        cardPanel.add(resultPanel, "RESULT_TEMP");
        cardLayout.show(cardPanel, "RESULT_TEMP");
    }

    private void styleTable(JTable table) {
        table.setRowHeight(30);
        table.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        table.getTableHeader().setBackground(SECONDARY_COLOR);
        table.getTableHeader().setForeground(Color.WHITE);
    }

    private void styleButton(JButton btn, Color bg) {
        btn.setBackground(bg);
        btn.setForeground(Color.WHITE);
        btn.setFont(new Font("Segoe UI", Font.BOLD, 13));
        btn.setFocusPainted(false);
        btn.setPreferredSize(new Dimension(180, 40));
    }

    private void incarcaDateInModel(String query, DefaultTableModel model) {
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            ResultSetMetaData metaData = rs.getMetaData();
            int cols = metaData.getColumnCount();
            model.setRowCount(0); model.setColumnCount(0);
            for (int i = 1; i <= cols; i++) model.addColumn(metaData.getColumnName(i));
            while (rs.next()) {
                Vector<Object> row = new Vector<>();
                for (int i = 1; i <= cols; i++) row.add(rs.getObject(i));
                model.addRow(row);
            }
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(this, "Eroare: " + ex.getMessage());
        }
    }

    private String getSql1303(String data) {
        return "SELECT id_d, data_introducere, aparat, simptome FROM Deviz WHERE data_constatare = '" + data + "' AND data_finalizare IS NULL";
    }

    private String getSql1305() {
        return "SELECT * FROM Deviz d WHERE d.id_d IN (SELECT pd1.id_d FROM Piesa_Deviz pd1 JOIN Piesa p1 ON pd1.id_p = p1.id_p WHERE p1.descriere LIKE '%şurub%' AND NOT EXISTS (SELECT 1 FROM Piesa_Deviz pd2 JOIN Piesa p2 ON pd2.id_p = p2.id_p WHERE p2.descriere LIKE '%şurub%' AND pd2.cantitate_stoc < pd1.cantitate_stoc))";
    }

    private String getSql1306() {
        return "SELECT id_depanator, MIN(total) as Minim, AVG(total) as Mediu, MAX(total) as Maxim FROM Deviz WHERE YEAR(data_introducere) = 2025 GROUP BY id_depanator";
    }

    private void deschidePaginaCautare(String label, String defaultVal, ParametrizedQuery queryGen) {
        JPanel searchPanel = new JPanel(new GridBagLayout());
        searchPanel.setBackground(BACKGROUND_COLOR);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        JTextField input = new JTextField(defaultVal, 15);
        JButton btnSearch = new JButton("CAUTĂ");
        styleButton(btnSearch, PRIMARY_COLOR);
        JButton btnBack = new JButton("REVENIRE");
        styleButton(btnBack, SECONDARY_COLOR);
        gbc.gridx = 0; gbc.gridy = 0; gbc.gridwidth = 2;
        searchPanel.add(new JLabel(label), gbc);
        gbc.gridy = 1; searchPanel.add(input, gbc);
        gbc.gridy = 2; gbc.gridwidth = 1;
        searchPanel.add(btnSearch, gbc);
        gbc.gridx = 1; searchPanel.add(btnBack, gbc);
        cardPanel.add(searchPanel, "SEARCH_TEMP");
        cardLayout.show(cardPanel, "SEARCH_TEMP");
        btnSearch.addActionListener(e -> deschidePaginaRezultate("Rezultate", queryGen.build(input.getText())));
        btnBack.addActionListener(e -> cardLayout.show(cardPanel, "MENIU"));
    }

    private void executaDeleteProcedural() {
        if (JOptionPane.showConfirmDialog(this, "Ștergeți datele vechi?", "Confirmare", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
            try (Connection conn = DriverManager.getConnection(url, user, password);
                 Statement stmt = conn.createStatement()) {
                conn.setAutoCommit(false);
                stmt.executeUpdate("DELETE FROM Piesa_Deviz WHERE id_d IN (SELECT id_d FROM Deviz WHERE YEAR(data_finalizare) < 2025)");
                int rows = stmt.executeUpdate("DELETE FROM Deviz WHERE YEAR(data_finalizare) < 2025");
                conn.commit();
                JOptionPane.showMessageDialog(this, "Șterse: " + rows + " rânduri.");
            } catch (SQLException ex) {
                JOptionPane.showMessageDialog(this, "Eroare: " + ex.getMessage());
            }
        }
    }

    interface ParametrizedQuery { String build(String param); }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new AtelierApp().setVisible(true));
    }
}