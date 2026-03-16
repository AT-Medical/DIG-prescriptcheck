# Sicherheitsrichtlinie – PrescriptCheck

**Letzte Aktualisierung:** Mai 2025  
**Verantwortlich:** AT Medical GmbH | prescriptcheck@at-medical.de

PrescriptCheck ist eine sicherheitskritische eHealth-Plattform zur Validierung von Privatrezepten.  
Wir verpflichten uns zu höchsten Standards in den Bereichen **Datensicherheit, Integrität, Verfügbarkeit und Missbrauchsvermeidung**.

---

## Verantwortungsvolle Sicherheitsmeldungen

Wir freuen uns über Hinweise zu potenziellen Schwachstellen.  
Bitte sende sicherheitsrelevante Informationen **nicht öffentlich**, sondern direkt an:

> **E-Mail:** security@at-medical.de  
> **PGP-Schlüssel (optional):** [in Kürze verfügbar]  
> **Reaktionszeit:** Wir antworten in der Regel innerhalb von 48 Stunden.

---

## Geltungsbereich

Diese Sicherheitsrichtlinie gilt für:

- **prescriptcheck.de** (Produktivinstanz)
- Alle zugehörigen **APIs, Dashboards, Adminmodule**
- Die Infrastruktur des öffentlichen GitHub-Repositories (`github.com/AT-Medical/prescriptcheck`)
- Drittanbieter-Anbindungen wie Stripe, PayPal, Tiramizoo (soweit von uns initiiert)

---

## Sicherheitsmaßnahmen in PrescriptCheck

- **Zwei-Faktor-Authentifizierung** für alle sensiblen Aktionen
- **Gerätebindung mit Geräte-ID-Protokollierung**
- **Token-basierte Rezeptfreigabe** vor Einlösung
- **Field-Level Encryption**, Data Masking & Transportverschlüsselung
- **Audit-Logs** auf Benutzer- und Systemebene
- **Verhaltensbasierte Missbrauchserkennung** (geplant)
- **QS-Leitstand mit Eskalationslogik** bei Auffälligkeiten
- **Temporäre Freigabefenster**, Softlocks & Sicherheits-Honeypots
- **Exportverschlüsselung mit Passwortpflicht** (AES-ZIP)
- **GPS-Protokollierung bei mobilen Auslieferungen**
- **Immutable Infrastructure** für produktive Komponenten
- **Zero-Trust-Architektur** in Entwicklung

---

## Sicherheitstests

Wir führen regelmäßig interne Sicherheitsprüfungen durch, u. a.:

- **Penetrationstests**
- **Audit-Trail-Verifikation**
- **Log-Konsistenzanalysen**
- **DSGVO-/NIS2-konforme Vorfallbehandlung**
- **Red-Team-Testumgebungen**

---

## Offenlegung und Koordination

Wenn du einen sicherheitsrelevanten Fehler entdeckst:

1. Melde ihn vertraulich an uns.
2. Gib uns angemessene Zeit (mind. 10 Werktage), um den Vorfall zu bewerten und zu beheben.
3. Optional: Du wirst öffentlich im Sicherheits-Dank (Hall of Fame) erwähnt, wenn du möchtest.

---

## Lizenzhinweis

PrescriptCheck ist eine kommerzielle Softwarelösung der AT Medical GmbH.  
Die Nutzung unterliegt strengen Lizenz- und Sicherheitsvorgaben.  
Jeglicher Missbrauch, Reverse Engineering oder unautorisierter Zugriff wird rechtlich verfolgt.

---

**Kontakt für Sicherheitsfragen:**  
security@at-medical.de  
AT Medical GmbH, Heidelberg  

---

<div style="border-left: 3px solid #ccc; padding-left: 12px; color: #888; font-size: 0.85em; margin-top: 24px;">

Version: 0.9.0  
Date: 2026-03-16  
Status: verified  
Repository: DIG-prescriptcheck

</div>
