import { NextPage } from 'next';
import React from 'react';

import Layout from '@/components/layout/Layout';

import { WithLayout } from '@/shared/types';

const Warranty: NextPage & WithLayout = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<p><strong>1. ĐIỀU KIỆN BẢO HÀNH:</strong></p><p><br></p><p><strong>Sản phẩm được bảo hành miễn phí nếu sản phẩm đó hội đủ các điều kiện sau:</strong></p><p><br></p><ol><li>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất</li><li>Còn trong thời hạn bảo hành&nbsp;(trên phiếu bảo hành hoặc trên hệ thống bảo hành điện tử)</li><li>Có hóa đơn điện tử (khi Người mua có yêu cầu) hoặc&nbsp;mã đơn hàng (ID đơn hàng)</li><li>Đối với các sản phẩm điện gia dụng, phiếu / tem bảo hành (và tem niêm phong) của nhà sản xuất (tùy từng hãng) trên sản phẩm còn nguyên vẹn.</li><li>Tất cả các trường hợp khách hàng báo lỗi với thông tin chưa rõ ràng hoặc chưa chắc chắn đều phải chuyển cho Trung Tâm Bảo Hành thẩm định trước khi ra quyết định bảo hành hoặc trả hàng.</li></ol><p><strong>Những trường hợp không được bảo hành hoặc phát sinh phí bảo hành:</strong></p><p><br></p><ol><li>Vi phạm một trong những điều kiện bảo hành miễn phí ở mục A.</li><li>Số series, model sản phẩm không hợp lệ (không khớp với thông tin trên Phiếu bảo hành hoặc trên hệ thống&nbsp;bảo hành điện tử)</li><li>Khách hàng tự ý can thiệp sửa chữa sản phẩm hoặc sửa chữa tại những trung tâm bảo hành không được sự ủy nhiệm của Hãng</li><li>Sản phẩm bị hư hỏng do lỗi người sử dụng, và lỗi hư không nằm trong phạm vi bảo hành của nhà sản xuất</li></ol><p><br></p><p><strong>2. THỜI HẠN BẢO HÀNH:</strong></p><p>&nbsp;</p><p>Thời hạn bảo hành được tính kể từ ngày mua hàng hoặc ngày nhận được sản phẩm, tùy theo từng sản phẩm của từng nhà sản xuất khác nhau.</p><p><br></p><p>Đối với sản phẩm bảo hành điện tử, thời hạn bảo hành được tính từ thời điểm kích hoạt bảo hành điện tử</p><p>Lưu ý: Người Mua có thể gửi yêu cầu hóa đơn VAT tới bộ phận Chăm sóc khách hàng Rubix để được hỗ trợ&nbsp;</p><p><strong>3. TRUNG TÂM BẢO HÀNH:</strong></p><p>&nbsp;</p><p>Thông tin của trung tâm bảo hành sẽ được ghi trong phiếu bảo hành kèm theo sản phẩm hoặc trên phần mô tả thông tin chi tiết của sản phẩm. Quý khách vui lòng liên hệ trực tiếp với trung tâm bảo hành để được hỗ trợ trong thời gian ngắn nhất</p><p><br></p><p>Trong trường hợp quý khách gặp khó khăn trong việc liên hệ trung tâm bảo hành, ở quá xa trung tâm bảo hành hoặc gặp các vấn đề bất tiện không thể đến trung tâm bảo hành trực tiếp, quý khách có thể liên hệ bộ phận Chăm sóc khách hàng Rubix để được hỗ trợ:</p><p><br></p><p>1. Hotline: 19001221</p><p><br></p><p>2. Email: rubix.support.com</p><p><br></p><p><strong>4.&nbsp;THỜI GIAN BẢO HÀNH:</strong></p><p><br></p><p><strong>a. Bảo hành tại nhà sản xuất</strong></p><p><br></p><p>Sản phẩm &nbsp;cung cấp được đảm bảo hàng chính hãng nên Rubix khuyến khích quý khách gửi sản phẩm trực tiếp đến&nbsp;địa chỉ bảo hành được đề cập trong phần mô tả chi tiết của sản phẩm&nbsp;để được hỗ trợ bảo hành trong thời gian nhanh nhất</p><p>Thời gian bảo hành trung bình từ vài ngày tùy thuộc vào linh kiện cần thay thế và Trung tâm bảo hành sẽ thông báo cụ thể đến quý khách</p><p><br></p><p><strong><em><img src="https://fileproxy.scsusercontent.com/api/v2/files/Y3MtaW5ob3VzZTAx/9f948a5b9ea14f1fbb3cbca4ea01f4c4.jpg"></em></strong></p><p><br></p><p><strong>b. Bảo hành thông qua Rubix</strong></p><p><br></p><p>Trường hợp quý khách gửi sản phẩm bảo hành về Rubix, chúng tôi sẽ gửi thông báo xác nhận đến quý khách khi Rubix nhận được sản phẩm</p><p><br></p><p>Thời gian bảo hành sản phẩm của quý khách dự kiến từ 20 ngày đến 45 ngày làm việc tính từ lúc Rubix nhận được sản phẩm, tùy thuộc vào linh kiện cần thay thế của Hãng và Rubix sẽ thông báo chi tiết đến quý khách sau khi có thông tin từ bên bảo hành</p><p>&nbsp;</p><h2>* Mọi chi tiết hoặc thắc mắc quý khách vui lòng liên hệ với&nbsp;Rubix để được hỗ trợ.&nbsp;Xin chân thành cảm ơn.</h2>`,
      }}
      className='p-10'
    />
  );
};
export default Warranty;

Warranty.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
