package com.sonar;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import alex.iamandi.SonarMonitoringTool.ProjectPK;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QProjectPK is a Querydsl query type for ProjectPK
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QProjectPK extends BeanPath<ProjectPK> {

    private static final long serialVersionUID = -852764324L;

    public static final QProjectPK projectPK = new QProjectPK("projectPK");

    public final NumberPath<Long> Id = createNumber("Id", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath URL = createString("URL");

    public QProjectPK(String variable) {
        super(ProjectPK.class, forVariable(variable));
    }

    public QProjectPK(Path<? extends ProjectPK> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProjectPK(PathMetadata<?> metadata) {
        super(ProjectPK.class, metadata);
    }

}

