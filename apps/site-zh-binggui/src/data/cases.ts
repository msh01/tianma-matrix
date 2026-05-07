export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  background: string;
  modules: string[];
  delivery: string[];
  note: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "retail-membership-platform",
    title: "门店会员小程序",
    category: "零售门店",
    image: "/assets/cases/retail-membership-platform.png",
    summary: "一个给连锁门店用的会员小程序，包含注册、积分、优惠券、门店核销和后台活动配置。",
    background:
      "客户有多家线下门店，会员信息、优惠券发放和活动核销长期靠表格和店员手工记录。总部想先做一个轻量版本，把最常用的会员和活动流程放到微信里。",
    modules: ["会员注册与资料维护", "积分记录与消费明细", "优惠券领取、使用和核销", "门店列表与门店二维码", "后台活动配置和基础数据导出"],
    delivery: [
      "先做小程序端和后台的核心流程，没有一上来做复杂营销系统。",
      "店员端只保留扫码核销、订单备注和核销记录，避免培训成本太高。",
      "后台保留表格导出，方便客户继续用原来的财务和运营习惯。"
    ],
    note: "这个案例更适合预算有限、但想把会员和门店活动先跑起来的客户。"
  },
  {
    slug: "manufacturing-workflow-system",
    title: "售后工单管理系统",
    category: "制造企业",
    image: "/assets/cases/manufacturing-workflow-system.png",
    summary: "给制造企业售后团队使用的工单系统，覆盖客户报修、派单、备件申请、现场记录和处理结果归档。",
    background:
      "客户原来的售后流程主要在微信群里推进。客服接到问题后发给技术人员，技术人员再找仓库确认备件，最后由财务核对费用。消息多了以后，容易漏单，也很难回头查某个客户的问题处理到哪一步。",
    modules: ["客户报修录入", "工单状态流转", "技术人员派单", "备件申请与出库记录", "现场照片和处理说明", "按客户、设备、时间查询历史工单"],
    delivery: [
      "第一版只覆盖售后最常见的几类工单，没有把生产、采购、财务全部塞进来。",
      "保留人工派单，由主管分配负责人，系统只负责记录状态和提醒。",
      "历史工单可以按客户和设备查，方便客服下次接到电话时先看到以前修过什么。"
    ],
    note: "这类项目重点不是炫技，而是把原来散在聊天记录里的事情变成一条能查、能跟、能交接的记录。"
  },
  {
    slug: "ai-content-operation-tool",
    title: "内容运营辅助工具",
    category: "AI 工具",
    image: "/assets/cases/ai-content-operation-tool.png",
    summary: "一个内部使用的内容整理工具，用来管理选题、素材、初稿、审核意见和发布清单。",
    background:
      "客户的内容团队每天要处理多个账号和多个栏目。素材在网盘，选题在表格，初稿在文档，审核意见在聊天记录里。AI 不是替代编辑，而是帮团队少做重复整理。",
    modules: ["选题池", "素材整理", "初稿生成草稿", "人工审核记录", "发布清单", "栏目模板管理"],
    delivery: [
      "AI 生成的内容默认只是草稿，发布前必须经过人工确认。",
      "栏目模板由客户自己维护，避免每次都重新写提示词。",
      "工具没有强行接入所有平台，先解决团队内部整理和审核的问题。"
    ],
    note: "这个案例适合已经有内容团队、但日常整理和审核成本比较高的客户。"
  }
];

export function getCaseBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
