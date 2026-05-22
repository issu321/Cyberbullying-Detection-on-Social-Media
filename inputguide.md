# 📖 CyberShield AI - Input Guide

<div align="center">

```
╔═══════════════════════════════════════════════════════════════╗
║              INPUT GUIDE & TROUBLESHOOTING                    ║
║                   Developed by issu321                        ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

---

## 📝 Supported Inputs

### Real-Time Text Input
- **Type:** Plain text
- **Length:** 1 - 5,000 characters
- **Language:** English (primary)
- **Format:** Any social media comment, message, or post

### Batch CSV Upload
- **File Type:** `.csv`
- **Required Column:** `comment`, `text`, `message`, `tweet`, `content`, or `post`
- **Max Size:** 10MB recommended
- **Encoding:** UTF-8

---

## 💬 Example Toxic Comments (Educational)

These examples are designed for **educational and testing purposes only**.

### ✅ Safe Examples
```
Great job on the project team!
This is really helpful information.
Can someone explain how this works?
Thank you for sharing this update.
Amazing work everyone!
```

### ⚠️ Mild Toxicity Examples
```
You are so stupid and dumb.
Nobody cares about your opinion.
This is the worst thing I have ever seen.
Your content is trash.
You are terrible at this.
```

### 🚨 Severe Toxicity Examples
```
You are worthless and should disappear forever.
I hope something terrible happens to you.
The world would be better without people like you.
You deserve nothing good in your life.
Everyone hates you and wants you gone.
```

> ⚠️ **Warning:** These examples contain moderate negative language for educational AI training purposes. They are not intended to offend.

---

## 📁 CSV Upload Examples

### Example 1: Simple Format
```csv
comment
"Great post, very informative!"
"This is absolutely terrible"
"You are the worst person here"
"Thanks for the help"
```

### Example 2: With Metadata
```csv
id,username,comment,timestamp
1,user123,"Great job everyone!",2024-01-15
2,troll99,"You are so stupid",2024-01-15
3,helper42,"Can you explain more?",2024-01-16
```

---

## 🔧 Troubleshooting

### Issue: `ModuleNotFoundError` on startup
**Solution:**
```bash
pip install -r requirements.txt
python -c "import nltk; nltk.download('vader_lexicon', quiet=True); nltk.download('stopwords', quiet=True); nltk.download('punkt', quiet=True)"
```

### Issue: Streamlit command not found
**Solution:** Use `python -m streamlit run app.py` instead of `streamlit run app.py`

### Issue: CSS not loading
**Solution:** Ensure the `assets/styles.css` file exists in the project root directory.

### Issue: Batch upload fails
**Solution:** Check that your CSV has a column named `comment`, `text`, `message`, or `tweet`.

---

## 🚀 Quick Start Examples

### Example 1: Analyze a Comment
1. Open the app
2. Click **🔍 Real-Time Detection**
3. Paste: `You are completely worthless`
4. Click **⚡ ANALYZE TEXT**
5. Review the toxicity gauge and AI explanation

### Example 2: Batch Process
1. Save the CSV example above as `comments.csv`
2. Click **📁 Batch Analysis**
3. Upload `comments.csv`
4. Click **🚀 RUN BATCH ANALYSIS**
5. Download the results

---

## 📊 Understanding Results

| Label | Color | Meaning | Action |
|-------|-------|---------|--------|
| **Safe** | 🟢 Green | No harmful content detected | Approve |
| **Toxic** | 🟠 Orange | Mild disrespect or negativity | Review |
| **Severe Toxic** | 🔴 Red | Serious harassment or threats | Immediate action |

---

<div align="center">

**🛡️ CYBERSHIELD AI**

*Developed by [issu321](https://github.com/issu321)*

</div>
