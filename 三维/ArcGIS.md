# ArcGIS Maps SDK for JavaScript

ArcGIS Maps SDK for JavaScript（ArcGIS JS API）从4.0起的版本起开始支持三维的形式

- 对于三维数据的加载，Cesium直接支持的格式为 **gltf/glb**和**3dtiles**，对于加载其他三维模型，核心的思想均是转为以上两种格式【具体的转换方法较多，如Cesiumlab】。转换完成后，可直接利用Cesium相关api进行加载或经Geoserver等发布后以url形式再加载。

- 在ArcGIS JS API当中，对于三维数据的加载主要支持的格式为 **slpk**（Scene Layer Package）。该格式是ArcGIS Pro软件中的一种打包格式，用于将三维场景数据和相关资源打包成一个单独的文件，方便在esri的各大ArcGIS 平台上进行共享和传输。

  

## 一、转slpk

在ArcGIS Pro中将各类三维数据转换为**slpk**的方式及步骤：

1）BIM

- ArcGIS Pro 3仅支持**ifc**与**rvt**，需预先将其他格式的BIM数据转为以上两种格式
- BIM格式本身没有地理坐标，需要在ArcGIS Pro中对BIM数据进行地理配准【Georeferencing】，生成坐标文件**prj**（参考：https://www.cnblogs.com/kk8085/p/17273818.html）
- 使用**BIM File To Geodatabase**先转到地理数据库，随后使用**Make Building Layer**将BIM加载到地图，最后使用**Create Building Scene Layer Content**转换成**slpk**
  - ArcGIS Pro也提供了一步到位的工具**Create Building Scene Layer Content**生成**slpk**，但似乎经常导致软件崩溃

2）倾斜摄影 osgb

- 使用ArcGIS Pro **创建集成网格场景图层包 **工具可直接转换为**slpk**

3）点云 las

- 使用ArcGIS Pro **create point cloud scene layer package **工具可直接转换为**slpk**

4）人工模型

- 使用 ArcGIS Pro **导入3D文件** 首先创建多面体要素类；随后使用 **创建3D对象场景图层内容** 生成**slpk**
- 此方法支持的人工模型格式有：**obj, 3ds, dae, wrl, flt**

5）3dtiles

ArcGIS Pro起初不支持对3dtiles的加载，在ArcGIS Pro 3.2（2023.11）起新增了对3dtiles数据的**加载**，但暂不支持对3dtiles转为**slpk**。目前只可通过转为**obj**, **gltf**等方法实现对3dtiles的web显示

6）glb/gltf

作为常用的三维数据，gltf无需进行转换可直接利用ArcGIS JS API进行加载

7）shapefile

shapefile一般用于表示二维矢量（点线面），但在ArcGIS Pro中，可根据某一字段将要素进行**拉伸 Extrude**（如依照建筑物的 height 字段），由此构建了三维模型。随后，使用 **3D图层转要素 **工具将拉伸的3D图层转要素类，再使用 **创建3D对象场景图层包** 打包为 **slpk**



除了在ArcGIS Pro中进行数据处理以外，esri的ArcGIS CityEngine也支持将各类数据【**如obj, ifc, dae, dwg, dxf, fbx, gltf, kml/kmz, shp**】导入并导出为**slpk**等格式【文档https://doc.arcgis.com/zh-cn/cityengine/2021.1/help/help-import-data-overview.htm】



## 二、发布slpk

在完成各种数据类型转为slpk后，需要进行将数据进行发布后，才能利用ArcGIS JS API进行加载

便捷的发布方式：

- ArcGIS Pro中可以使用**Share Package**工具直接便捷发布至ArcGIS Enterprice、GeoScene Enterprise
- 对于较小的slpk文件，可以直接在网页端进行上传，不必借助ArcGIS Pro



## 三、加载API

各类数据利用ArcGIS JS API的加载方式：

- **BIM：**BuildingSceneLayer
- **点云**：PointCloudLayer
- **倾斜摄影**：IntegratedMeshLayer
- **gltf**：ObjectSymbol3DLayer
- **其他：**FeatureLayer



## 四、其他数据类型

**地图服务**：WMTSLayer（WMTS）；WMSLayer（WMS）；WFSLayer（WFS）；ImageryLayer

**地图瓦片**：WebTileLayer；ImageryTileLayer

**矢量切片**：VectorTileLayer

**地形服务**：ElevationLayer

**OpenStreetMap**：OpenStreetMapLayer

**GeoJSON**：GeoJSONLayer，FeatureLayer

**kml/kmz**：不支持三维



## 五、对比与总结

- **闭源性与产品体系的相互依赖**

  区别于完全开源的Cesium，ArcGIS API作为esri的商业产品，是完全闭源的，两者的使用也有很大区别。

  Cesium支持的三维数据类型较少，但大量开发者在社区中贡献了优秀的数据类型转换工具，也有Cesiumlab等将各种转换工具进行了一定的集成。

  而利用ArcGIS JS API显示三维数据支持的格式为slpk，其数据转换基本只依靠ArcGIS Pro。作为世界上最成功的GIS产品，面对如今对三维数据分析及可视化日益增长的需求，ArcGIS Pro对三维数据的支持日益完善：其中集成了大量不同数据格式的slpk转换支持（而不是在使用Cesium时需要自行寻找转换方法并下载各类软件）。

  除了数据格式转换外，数据的发布也同样依赖于ArcGIS系列产品（ArcGIS Online, ArcGIS Enterprise），JS API中完全不支持加载其他开源的服务器（如GeoServer）中的数据。

  总的来说，使用ArcGIS JS API进行三维开发有着对esri全套产品体系的相互依赖。但由于ArcGIS产品体系的成熟与完备性，如果熟悉使用各类ArcGIS产品，那整体的开发将较为快捷。

  然而，虽然JS API的使用是完全免费的，但ArcGIS Pro，ArcGIS Enterprise等都较为昂贵。因此，使用ArcGIS JS API进行三维开发总体较少。

- **GeoScene与ArcGIS**

  ArcGIS API和ArcMap/ArcGIS Pro属于esri，GeoScene API和GeoScene Pro属于易智瑞。本质上看，两者无论是在桌面端软件的操作还是在JS API的写法上都完全相同，甚至在桌面端软件上可视为同一个软件【毕竟GeoScene Pro和ArcGIS Pro无法同时安装在一台电脑上】。对于GeoScene的API文档可视为对原先esri产品的中文翻译版，使用起来更为便捷。

- **对比高德与天地图**

  天地图基本只用作底图使用（CGCS2000和WGS84基本一致），其api不支持三维开发

  高德支持三维（插件），支持加载的模型有obj和gltf，功能较ArcGIS和Cesium相差很多，同时还有坐标系问题需要转换（火星坐标系）
