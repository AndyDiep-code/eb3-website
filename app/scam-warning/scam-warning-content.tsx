// Static content ported from scam-warning.html. No client-side interactivity
// in the legacy page beyond sidebar toggles (handled globally by <Layout>),
// so this stays a server component. Split into types/checks sections to
// keep each file under the project's file-size guideline.

import { Alert } from "./scam-warning-ui";
import { ScamWarningTypes } from "./scam-warning-types";
import { ScamWarningChecks } from "./scam-warning-checks";

export function ScamWarningContent() {
  return (
    <div>
      <Alert tone="orange" icon="⚠️">
        Trang này mô tả các <strong>kiểu lừa đảo phổ biến</strong> (không
        nhắm vào công ty/cá nhân cụ thể). Nếu bạn nghi ngờ mình đang là nạn
        nhân, hãy ngừng giao dịch ngay và liên hệ luật sư di trú hoặc cơ
        quan chức năng.
      </Alert>

      <ScamWarningTypes />
      <ScamWarningChecks />
    </div>
  );
}
