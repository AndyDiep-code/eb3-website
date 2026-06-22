// Render/state logic for documents.html — mirrors after-arrival.html's render()/save()/toggle()/resetAll()
const DOC_KEY = 'doc_checklist_v1';
let docSaved = {};
try { docSaved = JSON.parse(localStorage.getItem(DOC_KEY) || '{}'); } catch(e){}

function docSave() { localStorage.setItem(DOC_KEY, JSON.stringify(docSaved)); }

function docRender() {
  const container = document.getElementById('doc-checklist-container');
  container.innerHTML = '';
  let total = 0, done = 0;
  const stageCounts = {};

  DOC_STAGES.forEach(stage => {
    const div = document.createElement('div');
    div.className = 'phase-section';

    const stDone = stage.items.filter(it => docSaved[it.id]).length;
    const stTotal = stage.items.length;
    stageCounts[stage.id] = [stDone, stTotal];
    total += stTotal; done += stDone;

    div.innerHTML = `
      <div class="phase-header ${stage.cls}">
        <span class="phase-icon">${stage.icon}</span>
        <div>
          <div class="phase-title">${stage.title}</div>
          <div class="phase-sub">${stage.sub}</div>
        </div>
        <span class="phase-count">${stDone}/${stTotal}</span>
      </div>
      <div class="phase-body">
        ${stage.items.map(item => {
          const isDone = !!docSaved[item.id];
          const tagsHtml = [
            item.validity ? `<span class="cl-tag tag-validity">⏳ ${item.validity}</span>` : '',
            item.format ? `<span class="cl-tag tag-format">📐 ${item.format}</span>` : '',
            ...(item.prep||[]).map(p => `<span class="cl-tag tag-prep">🛠 ${p}</span>`)
          ].join('');
          return `
            <div class="cl-item ${isDone?'done':''}" onclick="docToggle('${item.id}')">
              <div class="cl-cb">${isDone?'✓':''}</div>
              <div class="cl-content">
                <div class="cl-task">${item.name}</div>
                ${tagsHtml ? `<div class="cl-tags">${tagsHtml}</div>` : ''}
              </div>
            </div>`;
        }).join('')}
      </div>`;
    container.appendChild(div);
  });

  const pct = total ? Math.round(done/total*100) : 0;
  document.getElementById('doc-prog-fill').style.width = pct + '%';
  document.getElementById('doc-prog-count').textContent = `${done} / ${total} giấy tờ đã chuẩn bị (${pct}%)`;
  DOC_STAGES.forEach(stage => {
    const el = document.getElementById('doc-cnt-' + stage.id);
    if(el) el.textContent = stageCounts[stage.id][0] + '/' + stageCounts[stage.id][1];
  });
}

function docToggle(id) {
  docSaved[id] = !docSaved[id];
  docSave();
  docRender();
}

function docResetAll() {
  if(!confirm('Xóa toàn bộ tiến độ đã lưu?')) return;
  docSaved = {};
  docSave();
  docRender();
}
